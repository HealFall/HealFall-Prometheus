import type { Meta } from "@storybook/react";
import useGenerateTemplate from ".";
import argTypes from "./doc";

const meta: Meta = {
  title: "通用Hooks/useGenerateTemplate",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes,
};

export default meta;

export const Default = {
  render: () => {
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
      },
      {
        title: "性别",
        dataIndex: "gender",
        valueEnum: {
          1: "男",
          2: "女",
        },
      },
      {
        title: "年龄",
        dataIndex: "age",
        render: (text: any) => <span>{text} 岁</span>,
      },
    ];

    const dataSource = [
      {
        id: 1,
        name: "张三",
        age: 28,
        gender: 1,
      },
      {
        id: 2,
        name: "李四",
        age: 32,
        gender: 2,
      },
    ];

    // 模拟异步请求
    const request: any = async (params: any) => {
      return new Promise((resolve) => {
        setTimeout(
          () =>
            resolve({
              data: [
                {
                  id: 3,
                  name: "王五",
                  age: 26,
                  gender: 1,
                },
              ],
              success: true,
              total: 1,
            }),
          1000
        );
      });
    };

    const { actionRef, Template } = useGenerateTemplate({
      rowKey: (record) => `${record.id}-${record.name}`,
      columns,
      dataSource,
      // request,
      // params: { status: "active" },
      operationColumns: (record: any) => (
        <a onClick={() => console.log(record)}> 自定义操作</a>
      ),
      operationWidth: 250,
      // useRowSelect: true,
      // search: false,
      // options: false,
      // pagination: false,

      // 详情相关
      // useDetail: false,
      // detailShowType: "drawer",
      // detailTitle: (record: any) =>
      //   `用户详情 - ${record?.name ? record?.name : ""}`,
      // detailWidth: 600,
      // detailColumn: 2,

      // 删除相关
      // useDelete: false,
      // deleteTips: "确定要删除该人吗？",
      onDelete: (record: any) => {
        console.log("删除数据：", record);
        actionRef.current?.reload();
      },
    });

    return <Template />;
  },
};
