import { GetDashboardDetailedItem, GetMembersInDashboardItem, InviteDashboardItem } from './api';

/** 구성원의 속성 타입 */
export type MemberType = GetMembersInDashboardItem['members'][0];

/** 대시보드 속성 타입 */
export type DashboardType = GetDashboardDetailedItem;

/** 초대 내역 속성 타입 */
export type InvitationType = InviteDashboardItem;
