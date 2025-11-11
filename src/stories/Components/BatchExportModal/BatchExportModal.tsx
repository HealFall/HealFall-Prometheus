import { Alert, Button, Modal } from "antd";
import type { ReactNode } from "react";

/** Modal相关 */
export interface ExportModalProps {
  /** 控制弹窗的现实 */
  open: boolean;
  /** 关闭弹窗的回调函数 */
  onClose: () => void;
  /** 弹窗的标题 */
  title?: string;
  /** 弹窗的宽度 */
  width?: number | string;
  /** 导出说明 */
  tips: string[];
  /** 自定义筛选条件（可以传入 React 节点或自定义组件） */
  filter?: ReactNode;
  /** 导出函数 */
  onExport: () => void;
}

/** 批量导出弹窗 BatchExportModal */
const BatchExportModal = ({
  open,
  onClose,
  title = "批量导出",
  width = "600px",
  tips = [],
  filter = null,
  onExport,
}: ExportModalProps) => {
  // 对宽度进行处理
  const widthAfterHandle = typeof width === "number" ? `${width}px` : width;

  // tips 必填校验
  if (!tips || !Array.isArray(tips) || tips.length === 0) {
    throw new Error("tips为必填项，且不能为空数组");
  }

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
            <Button key="export" type="primary" onClick={onExport}>
              确认导出
            </Button>
          </>
        }
      >
        <Alert
          message="导出说明"
          description={
            <ol style={{ paddingInlineStart: "20px" }}>
              {tips.map((tip, index) => (
                <li key={index} style={{ listStyle: "decimal" }}>
                  {tip}
                </li>
              ))}
            </ol>
          }
          type="info"
          showIcon
        />
        <div style={{ marginTop: "10px" }}>{filter}</div>
      </Modal>
    </>
  );
};
export default BatchExportModal;
