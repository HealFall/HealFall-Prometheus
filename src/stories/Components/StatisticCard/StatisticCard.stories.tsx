import type { Meta } from "@storybook/react-vite";
import StatisticCard from "./StatisticCard";

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
  render: () => <StatisticCard />,
};
