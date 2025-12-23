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
  dataSource = [],
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
   * 表格
   */
  const formRef = useRef<any>(null);
  const actionRef = useRef<ActionType>(null);
  const [currentRow, setCurrentRow] = useState<any>();
  // 列配置
  const operateColumns = [
    {
      title: "操作",
      dataIndex: "operation",
      fixed: "right" as const,
      width: operationWidth,
      hideInSearch: true,
      hideInTable: !(useDetail || useEdit || useDelete || operationColumns),
      render: (_: any, record: any) => (
        <Flex gap={16}>
          {useDetail && (
            <a
              key={OperationTypeEnum.DETAIL}
              onClick={() => handleOperation(OperationTypeEnum.DETAIL, record)}
            >
              查看
            </a>
          )}
          {useEdit && (
            <a
              key={OperationTypeEnum.EDIT}
              onClick={() => handleOperation(OperationTypeEnum.EDIT, record)}
            >
              编辑
            </a>
          )}
          {operationColumns ? operationColumns(record) : null}
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
  // 选择
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // 表格
  const Table = () => (
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
   * 详情
   * */
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const Detail = () => (
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
          <ProDescriptions
            columns={columns as any}
            dataSource={currentRow}
            column={detailColumn}
          ></ProDescriptions>
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
          <ProDescriptions
            columns={columns as any}
            dataSource={currentRow}
            column={detailColumn}
          ></ProDescriptions>
        </Modal>
      )}
    </>
  );

  // 新增和编辑
  const formColumns = columns.filter((column) => !column.hideInForm);
  const [operationType, setOperationType] = useState<OperationTypeEnum | null>(
    null
  );
  const [addOrEditVisible, setAddOrEditVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const generateFormItem = (column: any) => {
    const { title, valueType, valueEnum, fieldProps } = column;

    if (column.renderFormItem) {
      return column.renderFormItem();
    }

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

  useEffect(() => {
    if (addOrEditVisible) {
      handleReset();
    }
  }, [addOrEditVisible, operationType]);
  const handleReset = () => {
    form.resetFields();
    form.setFieldsValue(currentRow);
  };

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
                : onEdit && onEdit(form)
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

  // 操作处理
  const handleOperation = (type: OperationTypeEnum, record: any) => {
    setCurrentRow(record);
    switch (type) {
      case OperationTypeEnum.DETAIL:
        setDetailVisible(true);
        break;
      case OperationTypeEnum.ADD:
        setOperationType(OperationTypeEnum.ADD);
        setAddOrEditVisible(true);
        break;
      case OperationTypeEnum.EDIT:
        setOperationType(OperationTypeEnum.EDIT);
        setAddOrEditVisible(true);
        break;
      default:
        break;
    }
  };

  // 生成模板组件
  const Template = () => {
    return (
      <>
        <Table />
        {useDetail && <Detail />}
        {(useAdd || useEdit) && <GenerateForm />}
      </>
    );
  };

  return {
    formRef,
    actionRef,
    ...(useRowSelect === true && { selectedRowKeys }),
    Template,
  };
};

export default useGenerateTemplate;
