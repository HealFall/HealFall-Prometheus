import { Flex, Spin } from "antd";
import styles from "./StatisticCard.module.less";
import type { JSX } from "react";

export interface StatisticCardProps {
  /** 卡片标题 */
  title: string;
  /** 卡片数据 */
  value: number | string;
  /** 数据前缀 */
  prefix?: string | JSX.Element;
  /** 数据后缀 */
  suffix?: string | JSX.Element;
  /** 加载中状态 */
  loading?: boolean;
  /** 字体颜色 */
  color?: string;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 外部传入的右侧图片 src（静态导入或链接） */
  imageSrc?: string;
}

/** 数据统计卡片（单个） */
const StatisticCard = ({
  title,
  value,
  prefix,
  suffix,
  loading = false,
  color = "#000000",
  backgroundColor = "#f8f9ff",
  imageSrc,
}: StatisticCardProps) => {
  return (
    <Spin spinning={loading}>
      <Flex
        align="center"
        justify="center"
        gap={20}
        className={styles["card-container"]}
        style={{ background: backgroundColor }}
      >
        {/* 左侧数据 */}
        <Flex
          vertical
          align="flex-start"
          justify="center"
          flex={2}
          className={styles["content-container"]}
        >
          {/* 上方数据 */}
          <Flex
            align="center"
            justify="flex-start"
            flex={2}
            className={styles["statistic-value"]}
            style={{ color: color }}
          >
            {/* 前缀及间距 */}
            {prefix && (
              <>
                <span>{prefix}</span>
                <span style={{ width: "10px" }}></span>
              </>
            )}
            {/* 数据 */}
            <span>{value}</span>
            {/* 后缀及间距 */}
            {suffix && (
              <>
                <span style={{ width: "10px" }}></span>
                <span>{suffix}</span>
              </>
            )}
          </Flex>
          {/* 下方标题 */}
          <Flex
            align="center"
            justify="flex-start"
            flex={1}
            className={styles["statistic-title"]}
            style={{ color: color }}
          >
            {title}
          </Flex>
        </Flex>

        {/* 右侧图标 */}
        {imageSrc && (
          <Flex
            vertical
            align="flex-start"
            justify="center"
            flex={1}
            className={styles["illustration-container"]}
          >
            <img
              src={imageSrc}
              alt="illustration"
              className={styles["illustration-image"]}
            />
          </Flex>
        )}
      </Flex>
    </Spin>
  );
};

export default StatisticCard;
