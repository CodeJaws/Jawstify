import { useCallback, useEffect, useState } from 'react';

/** Window 가로 사이즈 구하기 */
const useCheckWindowWidthSize = () => {
  const [width, setWidth] = useState(0);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleResize();
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  return width;
};

/** Window 가로 사이즈를 통해 deviceType('pc', 'tablet', 'mobile') 반환 */
const useDeviceType = () => {
  const width = useCheckWindowWidthSize();
  if (width === 0) return;

  let deviceType;
  if (width >= 1024) {
    deviceType = 'pc';
  } else if (width >= 768) {
    deviceType = 'tablet';
  } else {
    deviceType = 'mobile';
  }

  return deviceType;
};

export default useDeviceType;
