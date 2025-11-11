import type { Meta } from "@storybook/react-vite";
import AreaCascader from "./AreaCascader";
import { useState } from "react";
import "@/styles/global.less";
import { Button, Form } from "antd";

const meta = {
  title: "组件/地区级联选择框",
  component: AreaCascader,
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
} satisfies Meta<typeof AreaCascader>;

export default meta;

export const Default = {
  name: "AreaCascader",
  render: () => {
    const [value, setValue] = useState<string[]>();
    const onChange = (value: string[]) => {
      setValue(value);
    };
    return (
      <>
        <div className="content-display">
          你选择的内容是： {value ? value.join(" / ") : "未选择"}
        </div>
        <AreaCascader value={value} onChange={onChange} />
      </>
    );
  },
};

export const FormUse = {
  name: "表单中使用",
  render: () => {
    const [form] = Form.useForm();
    const [value, setValue] = useState<string[]>();
    const handleSubmit = () => {
      form.validateFields().then((values) => {
        setValue(values.area);
      });
    };

    return (
      <>
        <div className="content-display">
          你选择的内容是： {value ? value.join(" / ") : "未选择"}
        </div>
        <Form form={form}>
          <Form.Item
            label="地区"
            name="area"
            rules={[{ required: true, message: "请选择地区" }]}
          >
            <AreaCascader />
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
