import type { ProColumns } from "@ant-design/pro-components";
import type { FormInstance } from "antd/lib";

export enum OperationTypeEnum {
  ADD = "add",
  EDIT = "edit",
  DETAIL = "detail",
  DELETE = "delete",
}

// 列配置
interface TemplateColumnsType extends ProColumns {
  title: string;
  dataIndex: string;
  valueEnum?: any;
  span?: number;
  formSpan?: number;
  valueType?:
    | "input"
    | "select"
    | "date"
    | "dateRange"
    | "time"
    | "timeRange"
    | "dateTime"
    | "dateTimeRange"
    | "dateWeek"
    | "dateWeekRange"
    | "dateMonth"
    | "dateMonthRange"
    | "dateQuarter"
    | "dateQuarterRange"
    | "dateYear"
    | "dateYearRange"
    | "digit"
    | "money"
    | "textArea";
  formItemProps?: any;
  fieldProps?: any;
  renderFormItem?: any;
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
  /** 工具栏渲染 */
  toolBarRenders?: React.ReactNode[];
}

// 详情
export interface DetailProps {
  /** 是否有详情 */
  useDetail?: boolean;
  /** 展示形式 */
  detailShowType?: "drawer" | "modal";
  /** 详情标题 */
  detailTitle?: string | ((record: any) => string);
  /** 详情列数 */
  detailColumn?: number;
  /** 详情宽度 */
  detailWidth?: number | string;
  /** 详情请求数据 */
  getDetail?: (record: any) => Promise<object>;
}

// 删除
export interface DeleteProps {
  /** 是否有删除 */
  useDelete?: boolean;
  /** 删除提示语 */
  deleteTips?: string | ((record: any) => string);
  /** 删除回调 */
  onDelete?: (record: any) => Promise<void>;
}

// 新增/编辑公共属性
interface CommonProps {
  /** 新增/编辑弹窗宽度 */
  addOrEditWidth?: number | string;
  /** 新增/编辑表单布局 */
  formLayout?: "horizontal" | "vertical" | "inline";
}

// 新增
export interface AddProps extends CommonProps {
  /** 是否有新增 */
  useAdd?: boolean;
  /** 新增标题 */
  addTitle?: string;
  /** 新增回调 */
  onAdd?: (form: FormInstance<any>) => Promise<void>;
}

// 编辑
export interface EditProps extends CommonProps {
  /** 是否有编辑 */
  useEdit?: boolean;
  /** 编辑标题 */
  editTitle?: string | ((record: any) => string);
  /** 编辑回调 */
  onEdit?: (record: any, form: FormInstance<any>) => Promise<void>;
}
