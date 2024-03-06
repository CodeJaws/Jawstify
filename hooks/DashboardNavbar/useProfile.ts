import useDeviceType from '@/hooks/Common/useDeviceType';
import useUserData from '@/hooks/global/useUserData';
import { UserType } from '@/types/apiType';

import { FocusEvent, useEffect, useState } from 'react';

function useProfile() {
  const { user } = useUserData();

  const [showUser, setShowUser] = useState<UserType>({
    createdAt: '',
    email: '',
    id: 0,
    nickname: '',
    profileImageUrl: null,
    updatedAt: '',
  });
  const { nickname, profileImageUrl } = showUser;
  const deviceType = useDeviceType();

  const [isDropdown, setIsDropdown] = useState(false);

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDropdown(false);
    }
  };

  const handleClickDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

  useEffect(() => {
    setShowUser(user);
  }, [user]);

  return { handleBlur, handleClickDropdown, profileImageUrl, nickname, deviceType, isDropdown };
}

export default useProfile;
