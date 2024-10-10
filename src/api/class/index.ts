import request from '@/utils/request';
import type {
  classInfoData,
  classListFormData,
  classResponseData,
  classListResponseData,
  classAllResponsrData,
} from './type';

enum API {
  CLASS_ALL_URL = '/manage/class/all',
  CLASS_ADD_URL = '/manage/class/add',
  CLASS_GO_TO_URL = '/manage/class/find',
  CLASS_UPDATE_URL = '/manage/class/update',
  CLASS_LIST_URL = '/manage/class/list',
  CLASS_DELETE_URL = '/manage/class/delete',
}

export const reqClassAll = () => {
  return request.get<any, classAllResponsrData>(API.CLASS_ALL_URL);
};
export const reqClassList = (data: classListFormData) => {
  return request.post<any, classListResponseData>(API.CLASS_LIST_URL, data);
};

export const reqClassAdd = (data: classInfoData) => {
  return request.post<any, classResponseData>(API.CLASS_ADD_URL, data);
};

export const reqClassById = (_id: string) => {
  return request.get<any, classResponseData>(
    API.CLASS_GO_TO_URL + `?_id=${_id}`
  );
};

export const reqClassUpdate = (data: classInfoData) => {
  return request.post<any, classResponseData>(API.CLASS_UPDATE_URL, data);
};

export const reqClassDelete = (classId: string) => {
  return request.post<any, classResponseData>(API.CLASS_DELETE_URL, {
    classId,
  });
};
