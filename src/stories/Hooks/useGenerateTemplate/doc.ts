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
  toolBarRenders: {
    description: "工具栏自定义渲染内容",
    table: {
      type: {
        summary: "React.ReactNode[]",
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

  // 新增/编辑公共配置
  addOrEditWidth: {
    description: "新增/编辑弹窗的宽度",
    table: {
      type: {
        summary: "number | string",
      },
      defaultValue: {
        summary: 600,
      },
      category: "hooks/函数参数/新增、编辑公用配置",
    },
  },
  formLayout: {
    description: "新增/编辑表单布局",
    table: {
      type: {
        summary: '"horizontal" | "vertical" | "inline"',
      },
      defaultValue: {
        summary: "vertical",
      },
      category: "hooks/函数参数/新增、编辑公用配置",
    },
  },

  // 新增相关
  useAdd: {
    description: "是否启用新增功能",
    table: {
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: true,
      },
      category: "hooks/函数参数/新增配置",
    },
  },
  addTitle: {
    description: "新增弹窗标题",
    table: {
      type: {
        summary: "string",
      },
      defaultValue: {
        summary: "新增",
      },
      category: "hooks/函数参数/新增配置",
    },
  },
  onAdd: {
    description: "新增回调函数；useAdd 为 true 时必填",
    table: {
      type: {
        summary: "(form: FormInstance<any>) => void",
      },
      category: "hooks/函数参数/新增配置",
    },
  },

  // 编辑相关
  useEdit: {
    description: "是否启用操作列中的编辑功能",
    table: {
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: true,
      },
      category: "hooks/函数参数/编辑配置",
    },
  },
  editTitle: {
    description: "编辑弹窗标题，支持字符串或函数",
    table: {
      type: {
        summary: "string | (record: any) => string",
      },
      defaultValue: {
        summary: "编辑",
      },
      category: "hooks/函数参数/编辑配置",
    },
  },
  onEdit: {
    description: "编辑回调函数；useEdit 为 true 时必填",
    table: {
      type: {
        summary: "(form: FormInstance<any>) => void",
      },
      category: "hooks/函数参数/编辑配置",
    },
  },

  // TemplateColumnsType 类型定义
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
  title: {
    description: "同ProTable",
    table: {
      category: "type/类型定义/表格列",
    },
  },
  dataIndex: {
    description: "同ProTable",
    table: {
      category: "type/类型定义/表格列",
    },
  },
  valueEnum: {
    description: "同ProTable",
    table: {
      category: "type/类型定义/表格列",
    },
  },
  renderFormItem: {
    description: "自定义表单项渲染，同ProTable",
    table: {
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
  formSpan: {
    descriptions: "表单中所占栅格数",
    table: {
      type: { summary: "number" },
      category: "type/类型定义/表格列",
    },
  },
  valueType: {
    description: "表单项类型",
    table: {
      type: {
        summary:
          '"input" | "select" | "date" | "dateRange" | "time" | "timeRange" | "dateTime" | "dateTimeRange" | "dateWeek" | "dateWeekRange" | "dateMonth" | "dateMonthRange" | "dateQuarter" | "dateQuarterRange" | "dateYear" | "dateYearRange" | "digit" | "money" | "textArea"',
      },
      category: "type/类型定义/表格列",
    },
  },
  formItemProps: {
    description: "表单项配置，同Ant Design Form.Item",
    table: {
      category: "type/类型定义/表格列",
    },
  },
  fieldProps: {
    description: "表单控件配置，同Ant Design Form组件的属性",
    table: {
      category: "type/类型定义/表格列",
    },
  },
};

export default argTypes;
