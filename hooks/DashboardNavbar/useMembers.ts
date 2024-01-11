import { createSlicedMembers } from '@/utils/createSlicedMembers';
import useDeviceType from '@/hooks/Common/useDeviceType';
import { MembersProps } from '@/components/DashboardNavbar/Members';

function useMembers({ members, totalMembers }: MembersProps) {
  const deviceType = useDeviceType();
  let showMembers = createSlicedMembers({ members, deviceType });
  const checkMemberLength = (deviceType === 'pc' && totalMembers > 4) || (deviceType !== 'pc' && totalMembers > 2);

  return { showMembers, checkMemberLength };
}

export default useMembers;
