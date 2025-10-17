import type { Meta } from "@storybook/react-vite";
import BatchImportModal from "./BatchImportModal.tsx";
import { useState } from "react";
import { Button } from "antd";

const meta = {
  title: "Components/BatchImportModal",
  component: BatchImportModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BatchImportModal>;

export default meta;

export const Demo = () => {
  const [open, setOpen] = useState(false);
  const tips = [
    "支持批量导入数据，提升工作效率",
    "请确保上传的文件格式正确，以免导入失败",
    "单次上传文件大小不超过5MB，支持多文件上传",
  ];

  const onUpload = (fileList: any[]) => {
    console.log("上传的文件列表", fileList);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开弹窗
      </Button>
      <BatchImportModal
        open={open}
        onClose={() => setOpen(false)}
        tips={tips}
        fileFormat={[".xls", ".xlsx", ".csv"]}
        multiple={true}
        template={true}
        onDownload={() => {
          console.log("点击了下载模板");
        }}
        onUpload={onUpload}
      />
    </>
  );
};
