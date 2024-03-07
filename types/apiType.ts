import { GetMembersInDashboardItem, LoadInviteDashboardItem, LoginItem } from '@/types/api';

/** 구성원의 속성 타입 */
export type MemberType = GetMembersInDashboardItem['members'][0];

/** 대시보드 속성 타입 */
export interface DashboardType {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

/** 초대 내역 속성 타입 */
export type InvitationType = LoadInviteDashboardItem['invitations'][0];

/** 유저 속성 타입 */
export type UserType = LoginItem['user'];

/** 대시보드 아이디 타입 */
export interface DashboardIdType {
  dashboardId: number;
}

/** 이메일 타입 */
export interface EmailType {
  email: string;
}

/** 비밀번호 타입 */
export interface PasswordType {
  password: string;
}

/** 구성원 아이디 타입 */
export interface MemberIdType {
  memberId: number;
}

/** 대시보드 제목, 색깔 타입 */
export interface DashboardBasicInfoType {
  title: string;
  color: string;
}

/** react Query Return 값 타입 */
export interface ReactQueryReturnType<T> {
  data: T | undefined;
  error?: Error | null;
  isLoading?: boolean;
}

/** Pagination 타입 */
export interface PaginationType {
  size?: number;
  page?: number;
}

/** API ERROR RESPONSE 타입 */
export interface ApiErrorResponse {
  data?: {
    message?: string;
  };
  status?: number;
}
