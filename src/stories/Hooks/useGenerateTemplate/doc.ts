const argTypes: any = {
  // 表格相关
  rowKey: {
    description: "表格行的唯一标识 key",
    type: { required: true },
    table: {
      type: {
        summary: "string | (record: any) => string",
      },
      category: "hooks/函数参数/表格配置",
    },
  },
  columns: {
    description: "表格列配置",
    type: { required: true },
    table: {
      type: {
        summary: "TemplateColumnsType[]",
      },
      category: "hooks/函数参数/表格配置",
    },
  },
  dataSource: {
    description: "静态数据源；与request二选一使用即可，优先使用dataSource",
    table: {
      type: {
        summary: "any[]",
      },
      defaultValue: {
        summary: "[]",
      },
      category: "hooks/函数参数/表格配置",
    },
  },
  request: {
    description:
      "数据请求方法，用于异步加载数据；与dataSource二选一使用即可，优先使用dataSource",
    table: {
      type: {
        summary: "(params, sort, filter) => Promise<{data, success, total}>",
      },
      category: "hooks/函数参数/表格配置",
    },
  },
  params: {
    description: "请求的额外参数",
    table: {
      type: {
        summary: "Record<string, any>",
      },
      defaultValue: {
        summary: "{}",
      },
      category: "hooks/函数参数/表格配置",
    },
  },
  operationColumns: {
    description: "自定义操作列内容，推荐使用`<a>`标签",
    table: {
      type: {
        summary: "(record: any) => React.ReactNode",
      },
      category: "hooks/函数参数/表格配置",
    },
  },
  operationWidth: {
    description: "操作列宽度",
    table: {
      type: {
        summary: "number",
      },
      defaultValue: {
        summary: 200,
      },
      category: "hooks/函数参数/表格配置",
    },
  },
  useRowSelect: {
    description: "是否启用行选择功能",
    table: {
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: false,
      },
      category: "hooks/函数参数/表格配置",
    },
  },
  search: {
    description: "搜索表单配置，false 表示不显示搜索表单（同ProTable）",
    table: {
      type: {
        summary: "false | object",
      },
      category: "hooks/函数参数/表格配置",
    },
  },
  options: {
    description: "工具栏配置，false 表示不显示工具栏（同ProTable）",
    table: {
      type: {
        summary: "false | object",
      },
      category: "hooks/函数参数/表格配置",
    },
  },
  pagination: {
    description: "分页配置，false 表示不显示分页（同ProTable）",
    table: {
      type: {
        summary: "false | object",
      },
      category: "hooks/函数参数/表格配置",
    },
  },

  // 详情相关
  useDetail: {
    description: "是否启用操作列中的详情功能",
    table: {
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: true,
      },
      category: "hooks/函数参数/详情配置",
    },
  },
  detailShowType: {
    description: "详情展示形式",
    table: {
      type: {
        summary: '"drawer" | "modal"',
      },
      defaultValue: {
        summary: "modal",
      },
      category: "hooks/函数参数/详情配置",
    },
  },
  detailTitle: {
    description: "详情标题，支持字符串或函数",
    table: {
      type: {
        summary: "string | (record: any) => string",
      },
      defaultValue: {
        summary: "详情",
      },
      category: "hooks/函数参数/详情配置",
    },
  },
  detailColumn: {
    description: "详情描述列表的列数",
    table: {
      type: {
        summary: "number",
      },
      defaultValue: {
        summary: 2,
      },
      category: "hooks/函数参数/详情配置",
    },
  },
  detailWidth: {
    description: "详情弹窗/抽屉的宽度",
    table: {
      type: {
        summary: "number | string",
      },
      defaultValue: {
        summary: 600,
      },
      category: "hooks/函数参数/详情配置",
    },
  },

  // 删除相关
  useDelete: {
    description: "是否启用操作列中的删除功能",
    table: {
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: true,
      },
      category: "hooks/函数参数/删除配置",
    },
  },
  deleteTips: {
    description: "删除提示文案，支持字符串或函数",
    table: {
      type: {
        summary: "string | (record: any) => string",
      },
      defaultValue: {
        summary: "确定要删除该条数据吗？",
      },
      category: "hooks/函数参数/删除配置",
    },
  },
  onDelete: {
    description: "删除回调函数；useDelete 为 true 时必填",
    table: {
      type: {
        summary: "(record: any) => void",
      },
      category: "hooks/函数参数/删除配置",
    },
  },

  // 删除相关
  TemplateColumnsType: {
    description:
      "表格列的类型，继承自`ProColumns`，在满足ProTable正常使用的同时，额外新增了几个属性",
    table: {
      type: {
        summary: "TemplateColumnsType extends ProColumns",
      },
      category: "type/类型定义/表格列",
    },
  },
  span: {
    description: "Descriptions中所占列数",
    table: {
      type: { summary: "number" },
      category: "type/类型定义/表格列",
    },
  },
};

export default argTypes;
