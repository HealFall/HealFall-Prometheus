import {
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Input,
  ConfigProvider,
  Form,
  Row,
  Col,
} from "antd";
import type { TemplateColumnsType } from "./type";
import zhCN from "antd/lib/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const useColumnsToForm = (columns: TemplateColumnsType[]) => {
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
    <ConfigProvider locale={zhCN}>
      <Row gutter={16}>
        {columns
          .filter((column) => !column.hideInForm)
          .map((column: any) => (
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
    </ConfigProvider>
  );

  return <GenerateForm />;
};

export default useColumnsToForm;
