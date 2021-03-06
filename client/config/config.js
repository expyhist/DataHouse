import React from 'react';
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

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
    SingleConfigColumns: [
      '_id', 'url', 'title', 'author', 'applicant', 'defaultParams', 'createdAt', 'updatedAt'
    ]
  },
  demandsColumnsInfo: {
    DemandsListColumns: {
      description: '需求详情', cols: '需求字段', applicant: '申请人', status: '需求状态', createdAt: '创建时间',
    },
    DemandsListStatusTags: [
      { status: 'finish', icon: <CheckCircleOutlined />, color: 'success' },
      { status: 'processing', icon: <SyncOutlined spin />, color: 'processing' },
      { status: 'waiting', icon: <ClockCircleOutlined />, color: 'default' },
      { status: 'stop', icon: <MinusCircleOutlined />, color: 'default' },
    ],
    AddDemandFormColumns: {
      description: '需求描述', cols: '需求字段', applicant: '申请人', executor: '分析师',  expectedTime: '期望时间', isUrgency: '是否紧急' 
    },
    SingleDemandColumns: [
      '_id', 'description', 'cols', 'applicant', 'executor', 'expectedTime', 'isUrgency', 'sql', 'status', 'reviewStatus', 'tag', 'addition', 'createdAt', 'updatedAt'
    ]
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
    RolesListColumns: {
      name: '角色', createdAt: '创建时间',
    },
    AddRoleFormColumns: {
      name: '角色', auth: '权限列表',
    },
    UpdateRoleFormColumns: {
      _id: 'id', name: '角色', auth: '权限列表',
    },
  },
  userColumnsInfo: {
    UsersListColumns: {
      email: '邮箱', password: '密码', rolesName: '角色', createdAt: '创建时间',
    },
    UpdateUserFormColumns: {
      _id: 'id', email: '邮箱', password: '密码', rolesName: '角色',
    },
  },
  sortList: {
    "/demands": 1,
    "/tables": 2,
    "/sysconfigs": 3
  }
};
