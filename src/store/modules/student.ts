import { defineStore } from 'pinia';
import {
  reqStudentAll,
  reqStudentAdd,
  reqStudentList,
  reqStudentById,
  reqStudentUpdate,
  reqStudentDelete,
} from '@/api/student';
import type {
  studentInfoData,
  studentListFormData,
  studentResponseData,
  studentAllResponseData,
  studentListResponseData,
} from '@/api/student/type';

import { studentState } from './types/type';
let useStudentStore = defineStore('Student', {
  state: (): studentState => {
    return {
      students: [],
    };
  },
  actions: {
    // 所有的
    async getStudentAll() {
      let result: studentAllResponseData = await reqStudentAll();
      if (result.status === 0) {
        this.students = result.data as studentInfoData[];
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 添加
    async addStudent(data: studentInfoData) {
      let result: studentResponseData = await reqStudentAdd(data);
      console.log(result);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 通过ID查找
    async getStudentById(_id: string) {
      let result: studentAllResponseData = await reqStudentById(_id);
      if (result.status === 0) {
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 分页
    async getStudentList(data: studentListFormData) {
      let result: studentListResponseData = await reqStudentList(data);
      if (result.status === 0) {
        this.students = result.data?.data as studentInfoData[];
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 更新
    async updataStudent(data: studentInfoData) {
      let result: StudentAllResponseData = await reqStudentUpdate(data);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async deleteStudent(studentId: string) {
      let result: studentResponseData = await reqStudentDelete(studentId);
      if (result.status === 0) {
        return 'OK';
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
  },
  getters: {},
});

export default useStudentStore;
