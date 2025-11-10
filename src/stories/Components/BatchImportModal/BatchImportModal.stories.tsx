import type { Meta } from "@storybook/react-vite";
import BatchImportModal from "./BatchImportModal.tsx";
import { useState } from "react";
import { Button, message } from "antd";

const meta = {
  title: "Components/BatchImportModal",
  component: BatchImportModal,
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
} satisfies Meta<typeof BatchImportModal>;

export default meta;

export const Demo = () => {
  // 弹窗控制
  const [open, setOpen] = useState(false);
  // 提示信息
  const tips = [
    "支持批量导入数据，提升工作效率",
    "请确保上传的文件格式正确，以免导入失败",
    "单次上传文件大小不超过5MB，支持多文件上传",
  ];
  // 上传函数
  const onUpload = async (fileList: any[]) => {
    console.log("上传的文件列表", fileList);

    /** 使用示例 */
    // if (!fileList || fileList.length === 0) {
    //   message.error("请先选择要上传的文件");
    //   return;
    // }
    // const formData = new FormData();
    // // 单文件时获取文件对象
    // formData.append("file", fileList[0]?.originFileObj || fileList[0]);
    // // 多文件时遍历文件列表获取文件对象
    // fileList.forEach((file) => {
    //   formData.append("files", file?.originFileObj || file);
    // });
    // try {
    //   const res = await UploadApi(formData);
    //   if (res.success) {
    //     message.success("上传成功");
    //   }
    // } catch (error) {
    //   console.log("上传失败", error);
    // }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开弹窗
      </Button>
      <BatchImportModal
        open={open}
        onClose={() => setOpen(false)}
        template={true}
        onDownload={() => {
          console.log("点击了下载模板");
        }}
        tips={tips}
        fileFormat={[".xls", ".xlsx", ".csv"]}
        onUpload={onUpload}
        maxCount={5}
      />
    </>
  );
};
