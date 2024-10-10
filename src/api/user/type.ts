export interface loginFormData {
  username: string;
  password: string;
}
interface dataType {
  token: string | null;
}

export interface loginResponseData {
  status: number;
  data?: userInfoData;
  msg?: string;
}

interface userRoleData {
  _id?: string;
  name?: string;
  menu: string[];
  create_time?: number;
  __v?: number;
  auth_time?: number;
  auth_name?: string;
}

export interface userInfoData {
  _id: string;
  username: string;
  name?: string;
  password: string;
  phone?: string;
  role_id?: string;
  create_time: number;
  token: string;
  __v: number;
  role: userRoleData;
}

export interface UserInfoResponseData {
  status: number;
  data: userInfoData;
}

export interface pwdData {
  userId: string;
  password: string;
}

export interface chenkPwdResponseDate {
  status: number;
  data?: userInfoData;
  msg?: string;
}

export interface userListFormData {
  page: number;
  size: number;
}
export interface uaerAllResponseData {
  status: number;
  data?: userInfoData[];
  msg?: string;
}

export interface userListResponseData {
  status: number;
  data?: userListData;
  msg?: string;
}

export interface userListData {
  data: userInfoData[];
  roles: [];
  total: number;
}
