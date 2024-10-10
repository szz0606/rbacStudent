import request from '@/utils/request';
import type {
  majorInfoData,
  majorListFormData,
  majorResponseData,
  majorAllResponsrData,
  majorListResponseData,
} from './type';
enum API {
  Major_ALL_URL = '/manage/major/all',
  Major_ADD_URL = '/manage/major/add',
  Major_GO_TO_URL = '/manage/major/find',
  Major_UPDATE_URL = '/manage/major/update',
  Major_LIST_URL = '/manage/major/list',
  Major_DELETE_URL = '/manage/major/delete',
}

export const reqMajorAll = () => {
  return request.get<any, majorAllResponsrData>(API.Major_ALL_URL);
};
export const reqMajorList = (data: majorListFormData) => {
  return request.post<any, majorListResponseData>(API.Major_LIST_URL, data);
};

export const reqMajorAdd = (data: majorInfoData) => {
  return request.post<any, majorResponseData>(API.Major_ADD_URL, data);
};

export const reqMajorById = (_id: string) => {
  return request.get<any, majorResponseData>(
    API.Major_GO_TO_URL + `?_id=${_id}`
  );
};

export const reqMajorUpdate = (data: majorInfoData) => {
  return request.post<any, majorResponseData>(API.Major_UPDATE_URL, data);
};

export const reqMajorDelete = (majorId: string) => {
  return request.post<any, majorResponseData>(API.Major_DELETE_URL, {
    majorId,
  });
};
