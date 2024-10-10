import { defineStore } from 'pinia';
import {
  reqMajorAll,
  reqMajorAdd,
  reqMajorById,
  reqMajorList,
  reqMajorUpdate,
  reqMajorDelete,
} from '@/api/major';
import type {
  majorInfoData,
  majorListFormData,
  majorResponseData,
  majorAllResponsrData,
  majorListResponseData,
} from '@/api/major/type';

import { majorState } from './types/type';

let useMajorStore = defineStore('Major', {
  state: (): majorState => {
    return {
      majors: [],
    };
  },
  actions: {
    // 所有的
    async getMajorAll() {
      let result: majorAllResponsrData = await reqMajorAll();
      if (result.status === 0) {
        this.majors = result.data as majorInfoData[];
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 添加
    async addMajor(data: majorInfoData) {
      let result: majorResponseData = await reqMajorAdd(data);
      console.log(result);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 通过ID查找
    async getMajorById(_id: string) {
      let result: majorAllResponsrData = await reqMajorById(_id);
      if (result.status === 0) {
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 分页
    async getMajorList(data: majorListFormData) {
      let result: majorListResponseData = await reqMajorList(data);
      if (result.status === 0) {
        this.majors = result.data?.data as majorInfoData[];
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 更新
    async updataMajor(data: majorInfoData) {
      let result: majorAllResponsrData = await reqMajorUpdate(data);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async deleteMajor(majorId: string) {
      let result: majorResponseData = await reqMajorDelete(majorId);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
  },
  getters: {},
});

export default useMajorStore;
