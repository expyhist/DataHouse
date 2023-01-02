module.exports = {
  HOST: '127.0.0.1',
  PORT: 27017,
  DB: 'datahouse',
  DB_TEST: 'datahouse_test',
  CONNECTIONOPTIONS: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  initalMenus: [{
    auth: [],
    parentPath: '/',
    path: '/demands',
    name: '数据需求',
    icon: '',
  }, {
    auth: [
      'GetDemands',
      'GetDemand',
      'AddNewDemand',
      'DeleteDemand',
      'UpdateDemand',
    ],
    parentPath: '/demands',
    path: '/demands/list',
    name: '需求列表',
    icon: 'BulbOutlined',
  }, {
    auth: [],
    parentPath: '/',
    path: '/tables',
    name: '数据报表',
    icon: '',
  }, {
    auth: [
      'GetConfigs',
      'GetConfig',
      'AddNewConfig',
      'DeleteConfig',
      'UpdateConfig',
      'AddNewFilter',
      'UpdateFilter',
    ],
    parentPath: '/tables',
    path: '/tables/configs/list',
    name: '配置中心',
    icon: 'SettingFilled',
  }, {
    auth: [],
    parentPath: '/tables',
    path: '/tables/databoard/:id',
    name: '仪表盘',
    icon: 'PieChartOutlined',
  }, {
    auth: [],
    parentPath: '/',
    path: '/sysconfigs',
    name: '全局配置',
    icon: '',
  }, {
    auth: [
      'GetMenus',
      'GetMenu',
      'AddNewMenu',
      'DeleteMenu',
      'UpdateMenu',
    ],
    parentPath: '/sysconfigs',
    path: '/sysconfigs/menus/list',
    name: '菜单列表',
    icon: 'OrderedListOutlined',
  }, {
    auth: [
      'GetUsers',
      'DeleteUser',
      'UpdateUser',
    ],
    parentPath: '/sysconfigs',
    path: '/sysconfigs/users/list',
    name: '用户列表',
    icon: 'UserOutlined',
  }, {
    auth: [
      'GetRoles',
      'GetRole',
      'AddNewRole',
      'DeleteRole',
      'UpdateRole',
    ],
    parentPath: '/sysconfigs',
    path: '/sysconfigs/roles/list',
    name: '角色列表',
    icon: 'GroupOutlined',
  }],
};
