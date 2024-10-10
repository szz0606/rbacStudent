import { defineStore } from 'pinia';
import { getRoleList, addRole, updataRole } from '@/api/role';

import { RoleState } from './types/roleType';
import type {
  roleInfoData,
  getRoleListResponseData,
  addRoleResponseData,
} from '@/api/role/type';
let useRoleStore = defineStore('Role', {
  state: (): RoleState => {
    return {
      roles: [],
    };
  },
  actions: {
    async roleList() {
      let result: getRoleListResponseData = await getRoleList();
      if (result.status === 0) {
        this.roles = result.data;
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async useAddRole(data: roleInfoData) {
      let result: addRoleResponseData = await addRole(data);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async useUpdateRole(data: roleInfoData) {
      let result: addRoleResponseData = await updataRole(data);
      if (result.status === 0) {
        return 'ok';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
  },
  getters: {},
});
export default useRoleStore;
