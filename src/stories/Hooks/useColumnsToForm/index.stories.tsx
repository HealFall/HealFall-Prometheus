import type { Meta } from "@storybook/react";
import useColumnsToForm from ".";
import { Button, Form } from "antd";

const meta: Meta = {
  title: "通用Hooks/useColumnsToForm",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "通过定义表格列的方式，生成对应的表单项，简化表单项的开发工作。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => {
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        formSpan: 12,
        formItemProps: {
          rules: [{ required: true, message: "请输入姓名" }],
        },
      },
      {
        title: "性别",
        dataIndex: "gender",
        valueEnum: {
          1: "男",
          2: "女",
        },
        formSpan: 12,
      },
      {
        title: "年龄",
        dataIndex: "age",
        render: (text: any) => <span>{text} 岁</span>,
        formSpan: 12,
      },
      {
        title: "地址",
        dataIndex: "address",
        formSpan: 12,
      },
    ];

    const [form] = Form.useForm();

    const handleSubmit = async () => {
      try {
        const values = await form.validateFields();
        console.log("Form Values:", values);
      } catch (error) {
        console.log("Failed to submit form:", error);
      }
    };

    return (
      <>
        <Form form={form} layout="vertical">
          {useColumnsToForm(columns)}
        </Form>
        <Button type="primary" style={{ marginTop: 16 }} onClick={handleSubmit}>
          提交
        </Button>
      </>
    );
  },
};
