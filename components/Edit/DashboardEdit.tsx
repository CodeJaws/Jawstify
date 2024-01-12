import styled from 'styled-components';

import ColorChip from '@/components/Chip/ColorChip';
import MobileColor from '@/components/Edit/MobileColorChip';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import Button from '@/components/common/Button/Button';
import useDashboardEdit from '@/hooks/Edit/useDashboardEdit';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { DashboardType } from '@/types/apiType';

interface DashboardEditProps {
  dashboardData: DashboardType;
}

function DashboardEdit({ dashboardData }: DashboardEditProps) {
  const { handleChange, deviceType, values, handleSubmit } = useDashboardEdit({ dashboardData });

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
