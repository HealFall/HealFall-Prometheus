import "@/styles/global.less";
import type { Meta, StoryObj } from "@storybook/react-vite";
import EthnicSelect from "./EthnicSelect";
import { useState } from "react";
import { Button, Form } from "antd";

const meta = {
  title: "Components/EthnicSelect",
  component: EthnicSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      table: {
        type: { summary: "number | string" },
      },
    },
  },
} satisfies Meta<typeof EthnicSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "民族选择框",
  render: () => {
    const [value, setValue] = useState<string>();
    const onChange = (value: string) => {
      setValue(value);
    };
    return (
      <>
        <div className="content-display">
          你选择的内容是： {value ? value : "未选择"}
        </div>
        <EthnicSelect value={value} onChange={onChange} />
      </>
    );
  },
};

export const FormUse: Story = {
  name: "表单中使用",
  render: () => {
    const [form] = Form.useForm();
    const [value, setValue] = useState<string>();
    const handleSubmit = () => {
      form.validateFields().then((values) => {
        setValue(values.ethnic);
      });
    };
    return (
      <>
        <div className="content-display">
          你选择的内容是： {value ? value : "未选择"}
        </div>
        <Form form={form}>
          <Form.Item
            label="民族"
            name="ethnic"
            rules={[{ required: true, message: "请选择民族" }]}
          >
            <EthnicSelect />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" onClick={handleSubmit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  },
};
