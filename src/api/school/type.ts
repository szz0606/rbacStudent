export interface schoolInfoData {
  _id?: string;
  schoolname: string;
  __v?: number;
}
export interface schoolListFormData {
  page: number;
  size: number;
}

export interface schoolResponseData {
  status: number;
  data?: schoolInfoData;
  msg?: string;
}

export interface schoolAllResponseData {
  status: number;
  data?: schoolInfoData[];
  msg?: string;
}

export interface schoolListResponseData {
  status: number;
  data?: schoolListData;
  msg?: string;
}
export interface schoolListData {
  data: schoolInfoData[];
  total: number;
}
