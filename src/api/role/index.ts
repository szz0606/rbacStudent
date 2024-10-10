import request from '@/utils/request';
import type {
  getRoleListResponseData,
  roleInfoData,
  addRoleResponseData,
} from './type';
export const getRoleList = () =>
  request.get<any, getRoleListResponseData>('/manage/role/list');

export const addRole = (data: roleInfoData) =>
  request.post<any, addRoleResponseData>('/manage/role/add', data);

export const updataRole = (data: roleInfoData) =>
  request.post<any, addRoleResponseData>('/manage/role/update', data);
