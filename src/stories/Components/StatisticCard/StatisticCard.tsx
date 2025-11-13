import { Flex, Spin } from "antd";
import styles from "./StatisticCard.module.less";
import bgIllustration from "@/assets/StatictisCard/阿里巴巴矢量图标模块.png";

export interface StatisticCardProps {
  /** 加载中状态 */
  loading?: boolean;
}

const StatisticCard = ({ loading = false }: StatisticCardProps) => {
  return (
    <Spin spinning={loading}>
      <Flex>
        <div className={styles["card-container"]}>
          <div className={styles["content-container"]}>
            <div className={styles["statistic-value"]}>¥ 10000</div>
            <div className={styles["statistic-title"]}>本年度培训学时总数</div>
          </div>
          <div className={styles["illustration-container"]}>
            <img
              src={bgIllustration}
              alt="illustration"
              className={styles["illustration-image"]}
            />
          </div>
        </div>
      </Flex>
    </Spin>
  );
};

export default StatisticCard;
