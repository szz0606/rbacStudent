export interface studentInfoData {
  _id?: string | undefined;
  name?: string;
  gender: string;
  school: string;
  major: string;
  education: string;
  direction: string;
  id_number: string;
  phone: string;
  parent: string;
  parent_phone: string;
  address: string;
  qq: string;
  class: string;
  admission_date: string;
  teacher_id: string;
  manager_id: string;
  pictures: string[];
  note: string;
  __v: string;
}
export interface studentListFormData {
  page: number;
  size: number;
  searchMap: searchMapData;
}
interface searchMapData {
  name?: string;
  direction: string;
  teacher_id: string;
  manager_id: string;
  class: string;
}
export interface studentResponseData {
  status: number;
  data?: studentInfoData;
  msg?: string;
}
export interface studentAllResponseData {
  status: number;
  data?: studentListFormData;
  msg?: string;
}
export interface studentListResponseData {
  status: number;
  data: studenListData;
  msg?: string;
}
interface studenListData {
  data: studentInfoData[];
  total: number;
}

// 学生数量
interface mounthData {
  _id: string;
  count: number;
}
export interface studentYearResponseData {
  status: number;
  data: mounthData[];
}
