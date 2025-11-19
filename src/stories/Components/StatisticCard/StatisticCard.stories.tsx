import type { Meta } from "@storybook/react-vite";
import StatisticCard from "./StatisticCard";
import customIcon from "@/assets/StatictisCard/坐标.png";
import { CloudDownloadOutlined } from "@ant-design/icons";

const meta = {
  title: "组件/数据统计卡片",
  component: StatisticCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatisticCard>;

export default meta;

export const Default = {
  name: "StatisticCard",
  args: {
    title: "总数",
    value: 20000,
    prefix: "¥",
    suffix: "元",
    color: "black",
    backgroundColor: "#f8f9ff",
    imageSrc: customIcon,
  },
};

export const Icon = {
  name: "前后缀自定义图标",
  args: {
    title: "下载量",
    value: "20,000",
    prefix: <CloudDownloadOutlined />,
    color: "black",
    backgroundColor: "#f8f9ff",
    imageSrc: customIcon,
  },
};

export const Loading = {
  name: "加载中",
  args: {
    title: "总数",
    value: 200,
    loading: true,
    backgroundColor: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    imageSrc: customIcon,
  },
};
