import request from '../../utils/request';
import type {
  loginFormData,
  loginResponseData,
  // UserInfoResponseData,
  pwdData,
  chenkPwdResponseDate,
  userListFormData,
  uaerAllResponseData,
  userListResponseData,
  userInfoData,
} from './type';

enum API {
  LOGIN_URL = '/login',
  // USERINFO_URL = '/user/info',
  LOGOUT_URL = '/logout',
  CHECK_PWD_URL = '/manage/user/pwd',
  UPDATE_PWD_URL = '/manage/user/pwd',
  USER_ALL_URL = '/manage/user/all',
  USER_LIST_URL = '/manage/user/list',
  USER_ADD_URL = '/manage/user/add',
  USER_GET_ID_URL = '/manage/user/find',
  USER_UPDATE_URL = '/manage/user/update',
  USER_DELETE_URL = '/manage/user/delete',
}
export const reqLogin = (data: loginFormData) =>
  // 向 API.LOGIN_URL 发送 HTTP POST 请求，
  // 包含 { username: 'test1', password: '123456' } 作为请求体。
  // request.post<any,loginResponseData> 返回一个promise对象
  //   类型是loginResponseData
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

// export const reqUserInfo = () =>
//   request.get<any, UserInfoResponseData>(API.USERINFO_URL);

export const reqLogout = () => request.post<any, any>(API.LOGIN_URL);

export const reqCheckPwd = (data: pwdData) =>
  request.post<any, chenkPwdResponseDate>(API.CHECK_PWD_URL, data);

export const reqUpdatePwd = (data: pwdData) =>
  request.put<any, chenkPwdResponseDate>(API.UPDATE_PWD_URL, data);
// 获取所有用户列表
export const reqUserALL = () =>
  request.get<any, uaerAllResponseData>(API.USER_ALL_URL);
// 获取用户列表(分页)
export const reqUserList = (data: userListFormData) =>
  request.post<any, userListResponseData>(API.USER_LIST_URL, data);
// 添加用户的接口
export const reqUserAdd = (data: userInfoData) =>
  request.post<any, loginResponseData>(API.USER_ADD_URL, data);

export const reqUserById = (_id: string) =>
  request.get<any, loginResponseData>(API.USER_GET_ID_URL + `?_id=${_id}`);

export const reqUserUpdate = (data: userInfoData) =>
  request.post<any, loginResponseData>(API.USER_UPDATE_URL, data);
// 删除
export const reqUserDelete = (userId: string) =>
  request.post<any, loginResponseData>(API.USER_DELETE_URL, { userId });
