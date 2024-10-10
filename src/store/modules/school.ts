import { defineStore } from 'pinia';
import {
  reqSchoolAll,
  reqSchoolList,
  reqSchoolAdd,
  reqSchoolById,
  reqSchoolUpdate,
  reqSchoolDelete,
} from '@/api/school';

import type {
  schoolInfoData,
  schoolListFormData,
  schoolResponseData,
  schoolAllResponseData,
  schoolListResponseData,
} from '@/api/school/type';

import { schoolState } from './types/type';
let useSchoolStore = defineStore('School', {
  state: (): schoolState => {
    return {
      schools: [],
    };
  },
  actions: {
    // 所有的
    async getSchoolAll() {
      let result: schoolAllResponseData = await reqSchoolAll();
      if (result.status === 0) {
        this.schools = result.data as schoolInfoData[];
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 获取列表 分页
    async getSchoolList(data: schoolListFormData) {
      let result: schoolListResponseData = await reqSchoolList(data);
      if (result.status === 0) {
        this.schools = result.data?.data as schoolInfoData[];
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 添加
    async addSchool(data: schoolInfoData) {
      let result: schoolResponseData = await reqSchoolAdd(data);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 通过ID查询
    async getSchoolById(_id: string) {
      let result: schoolAllResponseData = await reqSchoolById(_id);
      if (result.status === 0) {
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 更新
    async updateSchool(data: schoolInfoData) {
      let result: schoolAllResponseData = await reqSchoolUpdate(data);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 删除
    async deleteSchool(schoolId: string) {
      let result: schoolResponseData = await reqSchoolDelete(schoolId);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
  },
  getters: {},
});

export default useSchoolStore;
