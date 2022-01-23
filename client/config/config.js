export const defineConfig = {
  filtersInfo: {
    rangeDate: {
      divider: 'rangeDate',
      values: ['title', 'startDate', 'endDate'],
      cn: '双日期',
    },
    singleDate: {
      divider: 'singleDate',
      values: ['title', 'date'],
      cn: '单日期',
    },
    text: {
      divider: 'text',
      values: ['title', 'content'],
      cn: '字符串',
    },
    enum: {
      divider: 'enum',
      values: ['title', 'array'],
      cn: '枚举',
    },
  },
  apiTablesColumnsInfo: {
    ConfigsListColumns: {
      url: 'url链接', title: '标题', author: '创建人', applicant: '申请人', defaultParams: 'url参数的默认值', createdAt: '创建时间',
    },
    AddConfigFormColumns: {
      url: 'url链接', title: '标题', author: '创建人', applicant: '申请人', defaultParams: 'url参数的默认值'
    },
    UpdateConfigFormColumns: {
      _id: 'id', url: 'url链接', title: '标题', author: '创建人', applicant: '申请人', defaultParams: 'url参数的默认值'
    },
  },
  demandsColumnsInfo: {
    DemandsListColumns: {
      description: '需求详情', content: '需求字段', author: '创建人', applicant: '申请人', status: '需求状态', createdAt: '创建时间',
    },
    AddDemandFormColumns: { description: '需求详情', content: '需求字段', author: '创建人',applicant: '申请人' },
  },
  sysConfigsColumnsInfo: {
    MenusListColumns: {
      path: '菜单路径', name: '菜单名称', icon: '图标', parentPath: '上级菜单路径', auth: '权限列表', createdAt: '创建时间',
    },
    AddMenuFormColumns: {
      path: '菜单路径', name: '菜单名称', icon: '图标', parentPath: '上级菜单路径',
    },
    UpdateMenuFormColumns: {
      _id: 'id', path: '菜单路径', name: '菜单名称', icon: '图标', parentPath: '上级菜单路径', auth: '权限列表',
    },
  },
  userColumnsInfo: {
    UsersListColumns: {
      email: '邮件', password: '密码', rolesName: '角色'
    },
    UpdateUserFormColumns: {
      _id: 'id', email: '邮件', password: '密码', rolesName: '角色'
    },
  },
  sortList: {
    "/demands": 1,
    "/tables": 2,
    "/sysconfigs": 3
  }
};
