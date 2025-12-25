import type { Meta } from "@storybook/react";
import useGenerateTemplate from ".";
import argTypes from "./doc";
import { Button } from "antd";
import type { ProFormInstance } from "@ant-design/pro-components";

const meta: Meta = {
  title: "通用Hooks/useGenerateTemplate",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "基于`Ant Design Pro`的`ProTable`和`ProDescriptions`，封装的通用模板生成 Hook，支持表格展示、详情查看和删除操作等功能，简化开发流程，提高效率。",
      },
    },
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
      {
        title: "地址",
        dataIndex: "address",
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

    // 获取详情回调
    const getDetail = async (record: any) => {
      console.log("获取详情记录：", record);
      // 模拟获取详情操作
      return new Promise<any>((resolve) => {
        setTimeout(() => {
          resolve({
            id: 3,
            name: "HEALFALL",
            age: "28",
            birthday: "1995-05-15",
            gender: "1",
            address: "北京市朝阳区幸福大街100号",
          });
        }, 1000);
      });
    };

    // 删除操作回调
    const onDelete = async (record: any) => {
      console.log("删除记录：", record);
      // 模拟删除操作
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    };

    const { Template } = useGenerateTemplate({
      rowKey: (record) => `${record.id}-${record.name}`,
      columns,
      // dataSource,
      request,
      // params: { status: "active" },
      operationColumns: (record: any) => (
        <a onClick={() => console.log(record)}> 自定义操作</a>
      ),
      operationWidth: 250,
      // useRowSelect: true,
      // search: false,
      // options: false,
      // pagination: false,
      toolBarRenders: [
        <Button key="export" onClick={() => console.log("自定义导出操作")}>
          自定义导出
        </Button>,
      ],

      // useDetail: false,
      // detailShowType: "drawer",
      // detailTitle: (record: any) =>
      //   `用户详情 - ${record?.name ? record?.name : ""}`,
      // detailWidth: 600,
      // detailColumn: 2,
      getDetail,

      // useDelete: false,
      // deleteTips: "确定要删除该人吗？",
      onDelete,

      // useAdd: false,
      // addTitle: "新增用户",
      onAdd: async (form: ProFormInstance) => {
        const values = await form.validateFields();
        console.log("新增数据：", values);
      },

      // useEdit: false,
      // editTitle: (record: any) =>
      //   `编辑用户 - ${record?.name ? record?.name : ""}`,
      onEdit: async (record: any, form: ProFormInstance) => {
        const values = await form.validateFields();
        console.log("编辑数据：", { id: record.id, ...values });
      },
    });

    return <Template />;
  },
};
