export const defineConfig = {
  filtersInfo: {
    rangeDate: {
      divider: "rangeDate",
      values: ["title", "startDate", "endDate"],
      cn: "双日期"
    },
    singleDate: {
      divider: "singleDate",
      values: ["title", "date"],
      cn: "单日期"
    },
    text: {
      divider: "text",
      values: ["title", "text"],
      cn: "字符串"
    },
    enum: {
      divider: "enum",
      values: ["title", "array"],
      cn: "枚举"
    }
  },
  apiTablesColumnsInfo: {
    ConfigsListColumns: {"url": "url链接", "title": "标题", "author": "创建人", "applicant": "申请人", "createdAt": "创建时间"},
    AddConfigFormColumns: {"url": "url链接", "title": "标题", "author": "创建人", "applicant": "申请人"},
    UpdateConfigFormColumns: {"id": "id", "url": "url链接", "title": "标题", "author": "创建人", "applicant": "申请人"}
  },
  demandsColumnsInfo: {
    DemandsListColumns: {"description": "需求详情", "content": "需求字段", "applicant": "申请人", "status": "需求状态", "createdAt": "创建时间"},
    AddDemandFormColumns: {"description": "需求详情", "content": "需求字段", "applicant": "申请人"}
  },
  sysConfigsColumnsInfo: {
    AddMenuFormColumns: {"path": "菜单路径", "name": "菜单名称", "icon": "图标", "parent": "上级菜单路径"}
  }
}