import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import { fontStyle } from '@/styles/fontStyle';
import styled from 'styled-components';

interface Props {}

function CreateColumn() {
  return (
    <StyledContainer>
      <BasicInput></BasicInput>
    </StyledContainer>
  );
}

export default CreateColumn;

const StyledContainer = styled.div`
  /* padding: 100px 160px; */
  white-space: nowrap;
`;

const StyledDescription = styled.h5`
  ${fontStyle(18, 500)}
  text-align: center
`;
