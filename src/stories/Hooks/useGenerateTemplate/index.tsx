import {
  PageContainer,
  ProDescriptions,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";

import { useRef, useState } from "react";
import { Drawer, Flex, Modal, Popconfirm } from "antd";
import {
  OperationTypeEnum,
  type DeleteProps,
  type DetailProps,
  type TableProps,
} from "./type.d";

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
  // 详情相关
  useDetail = true,
  detailShowType = "modal",
  detailTitle = "详情",
  detailDataSource,
  detailColumn = 2,
  detailWidth = 600,
  // 删除相关
  useDelete = true,
  deleteTips = "确定要删除该条数据吗？",
  onDelete,
}: TableProps & DetailProps & DeleteProps) => {
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
  const allColumns = [
    ...columns,
    {
      title: "操作",
      dataIndex: "operation",
      fixed: "right" as const,
      width: operationWidth,
      hideInSearch: true,
      render: (_: any, record: any) => (
        <Flex gap={16}>
          {useDetail && (
            <a
              key={OperationTypeEnum.DETAIL}
              onClick={() => handleOperation(OperationTypeEnum.DETAIL, record)}
            >
              查看详情
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
        columns={allColumns}
        dataSource={dataSource}
        request={request}
        params={params}
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
            dataSource={detailDataSource || currentRow}
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
            dataSource={detailDataSource || currentRow}
            column={detailColumn}
          ></ProDescriptions>
        </Modal>
      )}
    </>
  );

  // 操作处理
  const handleOperation = (type: OperationTypeEnum, record: any) => {
    setCurrentRow(record);
    switch (type) {
      case OperationTypeEnum.DETAIL:
        setDetailVisible(true);
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
