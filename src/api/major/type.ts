export interface majorInfoData {
  _id: string;
  name: string;
  __v: number;
}
export interface majorListFormData {
  page: number;
  size: number;
}

export interface majorResponseData {
  status: number;
  data?: majorInfoData;
  msg?: string;
}
export interface majorAllResponsrData {
  status: number;
  data?: majorInfoData[];
  msg?: string;
}

export interface majorListResponseData {
  status: number;
  data?: majorListData;
  msg?: string;
}
export interface majorListData {
  data: majorInfoData[];
  total: number;
}
