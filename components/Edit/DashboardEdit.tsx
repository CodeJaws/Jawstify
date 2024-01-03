import { COLORS } from '@/styles/palettes';
import styled from 'styled-components';
import ColorChip from '../Chip/ColorChip';
import { fontStyle } from '@/styles/fontStyle';
import { useEffect, useState } from 'react';
import BasicInput from '../Input/ModalInputContainer/BasicInput';
import Button from '../common/Button/Button';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { DashboardType } from '@/types/apiType';
import API from '@/apis/api';
import {
  INVALID_COLOR_FORMAT_ERROR,
  NO_AUTH_CORRECT_DASHBOARD_ERROR,
  NO_CONTENT_FOR_CORRECTION_ERROR,
  NO_DASHBOARD_ERROR,
} from '@/constants/ApiError';
import useDeviceType from '@/hooks/useDeviceType';
import MobileColor from './MobileColorChip';

interface DashboardEditProps {
  dashboardData: DashboardType;
  refresh: () => void;
}

type ColorMap = {
  [key: string]: string;
};

const colorObj: ColorMap = {
  '녹색 원': COLORS.GREEN_7A,
  '보라색 원': COLORS.PURPLE_76,
  '오렌지 원': COLORS.ORANGE_FF,
  '하늘색 원': COLORS.BLUE_76,
  '핑크색 원': COLORS.PINK_E8,
};

function DashboardEdit({ dashboardData, refresh }: DashboardEditProps) {
  const [values, setValues] = useState({
    '대시보드 이름': dashboardData.title,
    색상: dashboardData.color,
  });
  const deviceType = useDeviceType();
  const handleChange = (inputLabel: string, inputValue: string) => {
    let val: string;
    if (inputLabel === '색상') {
      val = colorObj[inputValue];
    } else {
      val = inputValue;
    }
    setValues({
      ...values,
      [inputLabel]: val,
    });
  };

  const handleSubmit = async () => {
    if (values['대시보드 이름'].length >= 10) {
      alert('대시보드 이름을 9자 이하로 설정해주세요.');
      return;
    } else if (values['대시보드 이름'].length === 0) {
      alert('대시보드 이름을 입력해주세요.');
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
  background: ${COLORS.WHITE_FF};
  ${onTablet} {
    width: 100%;
  }

  ${onMobile} {
    width: 100%;
  }

  padding: 0 28px;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 29px;
  h3 {
    color: ${COLORS.BLACK_33};
    ${fontStyle(20, 700)};
  }
`;

const StyledMainWrapper = styled.div`
  margin-top: 37px;
  margin-bottom: 24px;
  h3 {
    color: ${COLORS.BLACK_33} ${fontStyle(18, 500)};
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
