import type { userInfoData } from '@/api/user/type';
import type { roleInfoData } from '@/api/role/type';
import type { schoolInfoData } from '@/api/school/type';
import type { majorInfoData } from '@/api/major/type';
import type { classInfoData } from '@/api/class/type';
import type { studentInfoData } from '@/api/student/type';
export interface UserState {
  // token: string | null;
  user: userInfoData | null;
  users: userInfoData[];
  students: studentInfoData | null;
}
export interface RoleState {
  roles: roleInfoData[] | undefined;
}

export interface schoolState {
  schools: schoolInfoData[] | undefined;
}

export interface majorState {
  majors: majorInfoData[] | undefined;
}

export interface classState {
  classes: classInfoData[] | undefined;
}
export interface studentState {
  students: classInfoData[] | undefined;
}
