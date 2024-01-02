import { GetMembersInDashboardItem } from '@/types/api';

type MemberType = GetMembersInDashboardItem['members'][0];

interface createSlicedMembersProps {
  members: MemberType[];
  deviceType: string | undefined;
}

/** 대시보드 Navbar에서 보여주는 프로필 이미지 목록 생성 - 추후에 들어오는 props값만 수정하면 됩니다. */
export const createSlicedMembers = ({ members, deviceType }: createSlicedMembersProps) => {
  if (deviceType === 'pc') return members.slice(0, Math.min(members.length, 4));
  return members.slice(0, Math.min(members.length, 2));
};
