import type { Meta } from "@storybook/react-vite";
import BatchExportModal from "./BatchExportModal.tsx";
import { useState } from "react";
import { Button, Form, Select } from "antd";

const meta = {
  title: "Components/BatchExportModal",
  component: BatchExportModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BatchExportModal>;

export default meta;

export const Demo = () => {
  const [open, setOpen] = useState(false);
  const tips = [
    "默认导出全部数据，也可以选择特定年度和部门进行筛选导出",
    "导出的文件为CSV格式，包含所有培训计划的详细信息",
  ];

  const [form] = Form.useForm();
  const filter = (
    <Form form={form}>
      <Form.Item label="年度" name="year">
        <Select defaultValue={"all"}>
          <option value="all">全部</option>
          <option value="2023">2023年</option>
          <option value="2022">2022年</option>
        </Select>
      </Form.Item>
      <Form.Item label="部门" name="department">
        <Select defaultValue={"all"}>
          <option value="all">全部</option>
          <option value="hr">人力资源部</option>
          <option value="it">信息技术部</option>
          <option value="sales">销售部</option>
        </Select>
      </Form.Item>
    </Form>
  );

  const onExport = () => {
    console.log("导出操作执行", form.getFieldsValue());
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开弹窗
      </Button>
      <BatchExportModal
        open={open}
        onClose={() => setOpen(false)}
        tips={tips}
        filter={filter}
        onExport={onExport}
      ></BatchExportModal>
    </>
  );
};
