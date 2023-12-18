import { styled } from 'styled-components';

interface CountChipProps {
  content: string;
}

function CountChip({ content }: CountChipProps) {
  return <StyledContainer>{content}</StyledContainer>;
}

export default CountChip;

const StyledContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #787486;
  background-color: #eeeeee;
`;
