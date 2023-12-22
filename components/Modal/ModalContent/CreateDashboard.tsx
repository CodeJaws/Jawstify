import { fontStyle } from '@/styles/fontStyle';
import styled from 'styled-components';

interface Props {}

function CreateDashboard() {
  return <StyledContainer></StyledContainer>;
}

export default CreateDashboard;

const StyledContainer = styled.div`
  /* padding: 100px 160px; */
  white-space: nowrap;
`;

const StyledDescription = styled.h5`
  ${fontStyle(18, 500)}
  text-align: center
`;
