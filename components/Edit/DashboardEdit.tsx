import API from '@/apis/api';
import ColorChip from '@/components/Chip/ColorChip';
import MobileColor from '@/components/Edit/MobileColorChip';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import Button from '@/components/common/Button/Button';
import {
  INVALID_COLOR_FORMAT_ERROR,
  NO_AUTH_CORRECT_DASHBOARD_ERROR,
  NO_CONTENT_FOR_CORRECTION_ERROR,
  NO_DASHBOARD_ERROR,
} from '@/constants/ApiError';
import useDeviceType from '@/hooks/Common/useDeviceType';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { DashboardType } from '@/types/apiType';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface DashboardEditProps {
  dashboardData: DashboardType;
  refresh: () => void;
}

type ColorMap = {
  [key: string]: string;
};

function DashboardEdit({ dashboardData, refresh }: DashboardEditProps) {
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

  return (
    <StyledContainer>
      <StyledTitleWrapper>
        <h3>{dashboardData.title}</h3>
        {deviceType !== 'mobile' ? (
          <ColorChip onChange={handleChange} color={values['색상']} />
        ) : (
          <MobileColor onChange={handleChange} color={values['색상']} />
        )}
      </StyledTitleWrapper>
      <StyledMainWrapper>
        <BasicInput
          label="대시보드 이름"
          placeholder="내 대시보드 이름"
          onChange={handleChange}
          inputValue={values['대시보드 이름']}
        />
      </StyledMainWrapper>
      <StyledButton
        isViolet={true}
        text="변경"
        size="small"
        onClick={handleSubmit}
        disabled={values['대시보드 이름'].length === 0}
      />
    </StyledContainer>
  );
}

export default DashboardEdit;

const StyledContainer = styled.div`
  position: relative;
  width: 620px;
  height: 256px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--content-color);
  border: var(--content-border);
  padding: 0 28px;

  ${onTablet} {
    width: 100%;
  }

  ${onMobile} {
    width: 100%;
  }
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 29px;

  h3 {
    color: ${COLORS.BLACK_33};
    ${fontStyle(20, 700)};
    color: var(--content-main);
  }
`;

const StyledMainWrapper = styled.div`
  margin-top: 37px;
  margin-bottom: 24px;

  h3 {
    color: ${COLORS.BLACK_33};
    ${fontStyle(18, 500)};
    color: #ffffff;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  width: 84px;
  height: 32px;
  bottom: 28px;
  right: 28px;

  ${onMobile} {
    height: 28px;
    bottom: 21px;
    right: 20px;
  }
`;
