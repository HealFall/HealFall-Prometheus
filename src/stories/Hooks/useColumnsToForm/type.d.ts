export interface TemplateColumnsType extends ProColumns {
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
  hideInForm?: boolean;
}
