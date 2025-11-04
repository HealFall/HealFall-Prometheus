import { InfoCircleFilled, UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import { useState, useEffect } from "react";
import "./BatchImportModal.less";

/** Tips相关 */
export interface TipsProps {
  /** 导入说明 */
  tips: string[];
}

/** Upload相关 */
export interface UploadProps {
  /** 文件格式限制 */
  fileFormat: string[];
  /** 上传文件函数 */
  onUpload: (options: any) => any;
  /** 上传数量限制 */
  maxCount?: number;
  /** 文件大小限制，单位为MB */
  maxSize?: number;
  /** 是否支持多文件上传 */
  multiple?: boolean;
}

/** Modal相关 */
export interface ImportModalProps extends TipsProps, UploadProps {
  /** 控制弹窗的现实 */
  open: boolean;
  /** 关闭弹窗的回调函数 */
  onClose: () => void;
  /** 弹窗的标题 */
  title?: string;
  /** 弹窗的宽度 */
  width?: number | string;
  /** 是否下载模版 */
  template?: boolean;
  /** 模版下载函数，template=true时必填 */
  onDownload?: () => void;
}

const { Dragger } = Upload;
/** 批量导入弹窗 */
const BatchImportModal = ({
  open,
  onClose,
  title = "批量导入",
  width = "600px",
  template = false,
  onDownload,
  tips,
  fileFormat,
  onUpload,
  maxCount = 1,
  maxSize,
  multiple = true,
}: ImportModalProps) => {
  useEffect(() => {
    if (open) {
      setFileList([]);
    }
  }, [open]);

  // 对宽度进行处理
  const widthAfterHandle = typeof width === "number" ? `${width}px` : width;

  // tips 必填校验
  if (!tips || !Array.isArray(tips) || tips.length === 0) {
    throw new Error("tips为必填项，且不能为空数组");
  }

  // 对文件格式进行校验处理
  if (!fileFormat || !Array.isArray(fileFormat) || fileFormat.length === 0) {
    throw new Error("fileFormat为必填项，且不能为空数组");
  }
  const accept = fileFormat
    .map((format) => (format.startsWith(".") ? format : `.${format}`))
    .join(",");

  if (template) {
    if (!onDownload) {
      throw new Error("当template为true时，onDownload为必填项");
    }
  }

  // 当显示“下载模版”按钮时，onDownload必填
  if (template && !onDownload) {
    throw new Error("当template为true时，onDownload为必填项");
  }

  // 本地管理 fileList，先存本地，点击确认后再上传到后端
  const [fileList, setFileList] = useState<any[]>([]);

  const uploadAttr = {
    name: "file",
    fileList: fileList,
    accept,
    beforeUpload: (file: any) => {
      // maxCount 校验
      if (fileList.length >= maxCount) {
        message.error(`最多只能上传 ${maxCount} 个文件`);
        return Upload.LIST_IGNORE;
      }

      // maxSize 校验（MB）
      if (
        maxSize &&
        fileList.some((file) => file.size > maxSize * 1024 * 1024)
      ) {
        message.error(`文件大小不能超过 ${maxSize}MB`);
        return Upload.LIST_IGNORE;
      }

      return false;
    },
    onChange(info: any) {
      setFileList(info.fileList);
    },
    onRemove(file: any) {
      setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
      return true;
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    maxCount,
    maxSize,
    multiple,
  };

  const handleUpload = async () => {
    onUpload(fileList);
  };

  return (
    <>
      <Modal
        open={open}
        title={title}
        width={widthAfterHandle}
        onCancel={onClose}
        footer={
          <>
            <Button key="cancel" onClick={onClose}>
              取消
            </Button>
            {template && (
              <Button key="download" onClick={onDownload}>
                下载模版
              </Button>
            )}
            <Button key="import" type="primary" onClick={handleUpload}>
              确认导入
            </Button>
          </>
        }
      >
        <div className="tips-container">
          <div className="title">
            <InfoCircleFilled style={{ color: "rgb(24,144,255)" }} />
            <div className="title-text">导入说明</div>
          </div>
          <div className="content">
            <ol>
              {tips.map((tip, index) => (
                <li className="lis" key={index}>
                  {tip}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <Dragger
          {...uploadAttr}
          fileList={fileList}
          style={{ marginTop: "10px" }}
        >
          <UploadOutlined className="upload-icon" />
          <p className="upload-text">点击或将文件拖拽到此处进行上传</p>
          <p className="upload-hint">
            支持{maxCount === 1 ? "单个文件" : "文件批量"}上传，仅支持
            {accept}等格式
          </p>
        </Dragger>
      </Modal>
    </>
  );
};
export default BatchImportModal;
