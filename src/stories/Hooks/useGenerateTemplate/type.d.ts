import type { ProColumns } from "@ant-design/pro-components";

export enum OperationTypeEnum {
  ADD = "add",
  EDIT = "edit",
  DETAIL = "detail",
  DELETE = "delete",
}

// 列配置
interface TemplateColumnsType extends ProColumns {
  /** Descriptions 占据的列数 */
  span?: number;
}

// 表格
export interface TableProps {
  /** 表格行的 key */
  rowKey: string | ((record: any) => string);
  /** 表格列 */
  columns: TemplateColumnsType[];
  /** 数据源 */
  dataSource?: any[];
  /** 数据请求 */
  request?: (
    params: {
      pageSize?: number;
      current?: number;
      [key: string]: any;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, React.Key[] | null>
  ) => Promise<{
    data: any[];
    success: boolean;
    total?: number;
  }>;
  /** 请求额外参数 */
  params?: Record<string, any>;
  /** 操作列 */
  operationColumns?: (record: any) => React.ReactNode;
  /** 操作列宽度 */
  operationWidth?: number;
  /** 是否有行选择 */
  useRowSelect?: boolean;
  /** 搜索配置 */
  search?: false | object;
  /** 工具栏 */
  options?: false | object;
  /** 分页配置 */
  pagination?: false | object;
}

// 详情
export interface DetailProps {
  /** 是否有详情 */
  useDetail?: boolean;
  /** 展示形式 */
  detailShowType?: "drawer" | "modal";
  /** 详情标题 */
  detailTitle?: string | ((record: any) => string);
  /** 详情数据源 */
  detailDataSource?: any;
  /** 详情列数 */
  detailColumn?: number;
  /** 详情宽度 */
  detailWidth?: number | string;
}

// 删除
export interface DeleteProps {
  /** 是否有删除 */
  useDelete?: boolean;
  /** 删除提示语 */
  deleteTips?: string | ((record: any) => string);
  /** 删除回调 */
  onDelete?: (record: any) => void;
}
