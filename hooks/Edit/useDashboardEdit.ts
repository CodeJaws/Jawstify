import { useEffect, useState } from 'react';

import useDeviceType from '../useDeviceType';
import API from '@/apis/api';
import { DashboardType } from '@/types/apiType';
import {
  INVALID_COLOR_FORMAT_ERROR,
  NO_AUTH_CORRECT_DASHBOARD_ERROR,
  NO_CONTENT_FOR_CORRECTION_ERROR,
  NO_DASHBOARD_ERROR,
} from '@/constants/ApiError';

interface useDashboardEditProps {
  dashboardData: DashboardType;
  refresh: () => void;
}

function useDashboardEdit({ dashboardData, refresh }: useDashboardEditProps) {
  const [values, setValues] = useState({
    '대시보드 이름': dashboardData.title,
    색상: dashboardData.color,
  });
  const deviceType = useDeviceType();
  const handleChange = (inputLabel: string, inputValue: string) => {
    setValues({
      ...values,
      [inputLabel]: inputValue,
    });
  };

  const handleSubmit = async () => {
    if (values['대시보드 이름'].length > 10) {
      alert('10글자 이하로 작성해주세요.');
      return;
    } else if (values['대시보드 이름'].length === 0) {
      alert('값을 입력해주세요.');
      return;
    }
    try {
      await API.dashboard.correctDashboard({
        dashboardId: Number(dashboardData.id),
        title: values['대시보드 이름'],
        color: values['색상'],
      });

      alert('변경 성공!');
      refresh();
    } catch (e: any) {
      switch (e.data.message) {
        case INVALID_COLOR_FORMAT_ERROR:
          alert(INVALID_COLOR_FORMAT_ERROR);
          break;
        case NO_AUTH_CORRECT_DASHBOARD_ERROR:
          alert(NO_AUTH_CORRECT_DASHBOARD_ERROR);
          break;
        case NO_CONTENT_FOR_CORRECTION_ERROR:
          alert(NO_CONTENT_FOR_CORRECTION_ERROR);
          break;
        case NO_DASHBOARD_ERROR:
          alert(NO_DASHBOARD_ERROR);
          break;
        default:
          alert(e.data.message);
          break;
      }
    }
  };

  useEffect(() => {
    setValues({
      '대시보드 이름': dashboardData.title,
      색상: dashboardData.color,
    });
  }, [dashboardData]);

  return { deviceType, handleChange, values, handleSubmit };
}

export default useDashboardEdit;
