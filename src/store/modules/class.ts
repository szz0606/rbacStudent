import { defineStore } from 'pinia';
import {
  reqClassAll,
  reqClassList,
  reqClassById,
  reqClassAdd,
  reqClassUpdate,
  reqClassDelete,
} from '@/api/class';

import type {
  classInfoData,
  classListFormData,
  classResponseData,
  classListResponseData,
  classAllResponsrData,
} from '@/api/class/type';
import { classState } from './types/type';

let useClassStore = defineStore('Class', {
  state: (): classState => {
    return {
      classes: [],
    };
  },
  actions: {
    // 所有的
    async getClassAll() {
      let result: classAllResponsrData = await reqClassAll();
      if (result.status === 0) {
        this.classes = result.data as classInfoData[];
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 添加
    async addClass(data: classInfoData) {
      let result: classResponseData = await reqClassAdd(data);
      console.log(result);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 通过ID查找
    async getClassById(_id: string) {
      let result: classAllResponsrData = await reqClassById(_id);
      if (result.status === 0) {
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 分页
    async getClassList(data: classListFormData) {
      let result: classListResponseData = await reqClassList(data);
      if (result.status === 0) {
        this.classes = result.data?.data as classInfoData[];
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 更新
    async updataClass(data: classInfoData) {
      let result: classAllResponsrData = await reqClassUpdate(data);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async deleteClass(classId: string) {
      let result: classResponseData = await reqClassDelete(classId);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
  },
  getters: {},
});

export default useClassStore;
