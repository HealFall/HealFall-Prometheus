import { Cascader } from "antd";
import { useState } from "react";
import areaOptions from "./AREA.json";

export interface AreaCascaderProps {
  /** 选择值 */
  value?: string[];
  /** 选择值变化时的回调 */
  onChange?: (value: string[]) => void;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 选择框宽度 */
  width?: number | string;
}

/** 地区级联选择框 AreaCascader */
const AreaCascader = ({
  value,
  onChange,
  showSearch = false,
  allowClear = true,
  width = "200px",
}: AreaCascaderProps) => {
  // 对宽度进行处理
  const widthAfterHandle = typeof width === "number" ? `${width}px` : width;

  const [defaultValue, setDefaultValue] = useState<string[]>();
  const handleChange = (value: string[]) => {
    setDefaultValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Cascader
      options={areaOptions}
      value={value || defaultValue}
      onChange={(value: string[]) => handleChange(value)}
      showSearch={showSearch}
      allowClear={allowClear}
      placeholder="请选择地区"
      style={{ width: widthAfterHandle }}
    />
  );
};

export default AreaCascader;
