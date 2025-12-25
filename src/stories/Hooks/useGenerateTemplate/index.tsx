import { PlusOutlined } from "@ant-design/icons";
import {
  PageContainer,
  ProDescriptions,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";
import { DatePicker } from "@formily/antd-v5";
import {
  Button,
  Col,
  ConfigProvider,
  Drawer,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Spin,
  TimePicker,
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import {
  OperationTypeEnum,
  type AddProps,
  type DeleteProps,
  type DetailProps,
  type EditProps,
  type TableProps,
} from "./type.d";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const useGenerateTemplate = ({
  rowKey,
  columns,
  dataSource,
  request,
  params = {},
  operationColumns,
  operationWidth = 200,
  useRowSelect = false,
  search,
  options,
  pagination,
  toolBarRenders,
  // 详情相关
  useDetail = true,
  detailShowType = "modal",
  detailTitle = "详情",
  detailColumn = 2,
  detailWidth = 600,
  getDetail,
  // 删除相关
  useDelete = true,
  deleteTips = "确定要删除该条数据吗？",
  onDelete,
  // 新增/编辑共用
  addOrEditWidth = 600,
  formLayout = "vertical",
  // 新增
  useAdd = true,
  addTitle = "新增",
  onAdd,
  // 编辑
  useEdit = true,
  editTitle = "编辑",
  onEdit,
}: TableProps & DetailProps & DeleteProps & AddProps & EditProps) => {
  /**
   * 前置校验
   */
  if (useDelete && !onDelete) {
    throw new Error("useDelete 为 true 时，onDelete 回调函数为必填项");
  }

  /**
   * -----------------------------------------------------------------------
   * 表格相关
   */
  const formRef = useRef<any>(null);
  const actionRef = useRef<ActionType>(null);
  const [currentRow, setCurrentRow] = useState<any>();
  /* 操作列 */
  const operateColumns = [
    {
      title: "操作",
      dataIndex: "operation",
      fixed: "right" as const,
      width: operationWidth,
      hideInSearch: true,
      /* 操作列是否显示，取决于是否启用详情、编辑、删除或自定义操作列 */
      hideInTable: !(useDetail || useEdit || useDelete || operationColumns),
      render: (_: any, record: any) => (
        <Flex gap={16}>
          {/* 详情 */}
          {useDetail && (
            <a
              key={OperationTypeEnum.DETAIL}
              onClick={() => handleOperation(OperationTypeEnum.DETAIL, record)}
            >
              查看
            </a>
          )}
          {/* 编辑 */}
          {useEdit && (
            <a
              key={OperationTypeEnum.EDIT}
              onClick={() => handleOperation(OperationTypeEnum.EDIT, record)}
            >
              编辑
            </a>
          )}
          {/* 自定义操作列 */}
          {operationColumns ? operationColumns(record) : null}
          {/* 删除 */}
          {useDelete && (
            <Popconfirm
              title={
                deleteTips instanceof Function
                  ? deleteTips(currentRow)
                  : deleteTips
              }
              onConfirm={() => onDelete && onDelete(record)}
            >
              <a key={OperationTypeEnum.DELETE} style={{ color: "red" }}>
                删除
              </a>
            </Popconfirm>
          )}
        </Flex>
      ),
    },
  ];
  /* 列表-行选择相关 */
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  /* 生成表格 */
  const GenerateTable = () => (
    <PageContainer>
      <ProTable
        rowKey={rowKey}
        formRef={formRef}
        actionRef={actionRef}
        columns={[...columns, ...operateColumns] as any}
        dataSource={dataSource}
        request={request}
        params={params}
        toolBarRender={() => [
          useAdd && (
            <Button
              key={OperationTypeEnum.ADD}
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleOperation(OperationTypeEnum.ADD, null)}
            >
              新增
            </Button>
          ),
          ...(Array.isArray(toolBarRenders) ? toolBarRenders : []),
        ]}
        // 条件渲染属性
        {...(useRowSelect === true && { rowSelection })}
        {...(search !== undefined && { search })}
        {...(options !== undefined && { options })}
        {...(pagination !== undefined && { pagination })}
      />
    </PageContainer>
  );

  /**
   * -----------------------------------------------------------------------
   * 详情相关
   * */
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const GenerateDetail = () => (
    <>
      {detailShowType === "drawer" ? (
        <Drawer
          title={
            detailTitle instanceof Function
              ? detailTitle(currentRow)
              : detailTitle
          }
          open={detailVisible}
          onClose={() => setDetailVisible(false)}
          width={detailWidth}
        >
          <Spin spinning={detailLoading}>
            <ProDescriptions
              columns={columns as any}
              dataSource={currentRow}
              column={detailColumn}
            />
          </Spin>
        </Drawer>
      ) : (
        <Modal
          title={
            detailTitle instanceof Function
              ? detailTitle(currentRow)
              : detailTitle
          }
          open={detailVisible}
          onCancel={() => setDetailVisible(false)}
          width={detailWidth}
          footer={null}
        >
          <Spin spinning={detailLoading}>
            <ProDescriptions
              columns={columns as any}
              dataSource={currentRow}
              column={detailColumn}
            />
          </Spin>
        </Modal>
      )}
    </>
  );

  /**
   * -----------------------------------------------------------------------
   * 新增/编辑相关
   * */
  const formColumns = columns.filter((column) => !column.hideInForm);
  const [operationType, setOperationType] = useState<OperationTypeEnum | null>(
    null
  );
  const [addOrEditVisible, setAddOrEditVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  /* 打开新增/编辑弹窗时，重置表单 */
  useEffect(() => {
    if (addOrEditVisible) {
      handleReset();
    }
  }, [addOrEditVisible, operationType]);
  /* 重置表单，包括状态和数据 */
  const handleReset = () => {
    form.resetFields();
    form.setFieldsValue(currentRow);
  };
  /* 生成表单项 */
  const generateFormItem = (column: any) => {
    const { title, valueType, valueEnum, fieldProps } = column;
    /* 若有自定义，采用自定义 */
    if (column.renderFormItem) {
      return column.renderFormItem();
    }
    /* 根据valueType生成对应的表单项 */
    switch (valueType) {
      case "select":
        return (
          <Select
            placeholder={`请选择${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          >
            {valueEnum &&
              Object.entries(valueEnum).map(([value, label]: any) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
          </Select>
        );
      case "date":
        return (
          <DatePicker
            placeholder={`请选择${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "dateRange":
        return (
          <DatePicker.RangePicker style={{ width: "100%" }} {...fieldProps} />
        );
      case "time":
        return (
          <TimePicker
            placeholder={`请选择${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "timeRange":
        return (
          <TimePicker.RangePicker style={{ width: "100%" }} {...fieldProps} />
        );
      case "dateTime":
        return (
          <DatePicker
            showTime
            placeholder={`请选择${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "dateTimeRange":
        return (
          <DatePicker.RangePicker
            showTime
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "dateWeek":
        return (
          <DatePicker
            picker="week"
            placeholder={`请选择${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "dateWeekRange":
        return (
          <DatePicker.RangePicker
            picker="week"
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "dateMonth":
        return (
          <DatePicker
            picker="month"
            placeholder={`请选择${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "dateMonthRange":
        return (
          <DatePicker.RangePicker
            picker="month"
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "dateQuarter":
        return (
          <DatePicker
            picker="quarter"
            placeholder={`请选择${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "dateQuarterRange":
        return (
          <DatePicker.RangePicker
            picker="quarter"
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "dateYear":
        return (
          <DatePicker
            picker="year"
            placeholder={`请选择${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "dateYearRange":
        return (
          <DatePicker.RangePicker
            picker="year"
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "digit":
        return (
          <InputNumber
            placeholder={`请输入${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      case "money":
        return (
          <InputNumber
            placeholder={`请输入${title}`}
            style={{ width: "100%" }}
            prefix="¥"
            {...fieldProps}
          />
        );
      case "textarea":
        return (
          <Input.TextArea
            placeholder={`请输入${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
      default:
        return (
          <Input
            placeholder={`请输入${title}`}
            style={{ width: "100%" }}
            {...fieldProps}
          />
        );
    }
  };
  /* 生成表单 */
  const GenerateForm = () => (
    <Modal
      title={
        operationType === OperationTypeEnum.ADD
          ? addTitle
          : editTitle instanceof Function
          ? editTitle(currentRow)
          : editTitle
      }
      open={addOrEditVisible}
      onCancel={() => setAddOrEditVisible(false)}
      footer={
        <>
          <Button key="cancel" onClick={() => setAddOrEditVisible(false)}>
            取消
          </Button>
          <Button key="reset" onClick={handleReset}>
            重置
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={() =>
              operationType === OperationTypeEnum.ADD
                ? onAdd && onAdd(form)
                : onEdit && onEdit(currentRow, form)
            }
          >
            保存
          </Button>
        </>
      }
      width={addOrEditWidth}
    >
      <ConfigProvider locale={zhCN}>
        <Form form={form} layout={formLayout}>
          <Row gutter={16}>
            {formColumns.map((column: any) => (
              <Col span={column.formSpan || 24} key={column.dataIndex}>
                <Form.Item
                  label={column.title}
                  name={column.dataIndex}
                  rules={column.formItemProps?.rules}
                  {...column.formItemProps}
                >
                  {generateFormItem(column)}
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      </ConfigProvider>
    </Modal>
  );

  /**
   * -----------------------------------------------------------------------
   * 操作处理函数，包括对详情、编辑、新增的处理
   * */
  const handleOperation = async (type: OperationTypeEnum, record: any) => {
    switch (type) {
      case OperationTypeEnum.DETAIL:
        setDetailVisible(true);
        if (getDetail) {
          try {
            setDetailLoading(true);
            setCurrentRow(await getDetail(record));
          } catch (error) {
            console.error("获取详情数据失败：", error);
          } finally {
            setDetailLoading(false);
          }
        } else {
          setCurrentRow(record);
        }
        break;
      case OperationTypeEnum.ADD:
        setCurrentRow(record);
        setOperationType(OperationTypeEnum.ADD);
        setAddOrEditVisible(true);
        break;
      case OperationTypeEnum.EDIT:
        setCurrentRow(record);
        setOperationType(OperationTypeEnum.EDIT);
        setAddOrEditVisible(true);
        break;
      default:
        break;
    }
  };

  /**
   * -----------------------------------------------------------------------
   * 模板组件
   */
  const Template = () => {
    return (
      <>
        <GenerateTable />
        {useDetail && <GenerateDetail />}
        {(useAdd || useEdit) && <GenerateForm />}
      </>
    );
  };

  /**
   * -----------------------------------------------------------------------
   * 返回相关引用和组件
   * @return {formRef, actionRef, selectedRowKeys, Template}
   * formRef: 表单引用
   * actionRef: 表格操作引用
   * selectedRowKeys: 选中行的键值数组（仅在启用行选择时返回）
   * Template: 生成的模板组件
   */
  return {
    formRef,
    actionRef,
    ...(useRowSelect === true && { selectedRowKeys }),
    Template,
  };
};

export default useGenerateTemplate;
