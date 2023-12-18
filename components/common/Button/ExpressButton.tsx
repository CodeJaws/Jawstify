import styled from 'styled-components'

function ExpressButton() {
  return (
    <Div>
      <AcceptButton>수락</AcceptButton>
      <RejectButton>거절</RejectButton>
    </Div>
  )
}

export default ExpressButton

const Div = styled.div`
  display: flex;
  gap: 10px;
`

const AcceptButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  width: '84px';
  height: '32px';
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #5534da;
  color: #fff;
  font-size: '14px';
  font-weight: 500;

  @media (width) {
    width: 84px;
    height: 32px;
  }

  @media (width) {
    width: 72px;
    height: 30pxl;
  }

  @media (width) {
    width: 109px;
    height: 28px;
    font-size: 1.2rem;
  }
`
const RejectButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  width: '84px';
  height: '32px';
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #5534da;
  font-size: '14px';
  font-weight: 500;

  @media (width) {
    width: 84px;
    height: 32px;
  }

  @media (width) {
    width: 72px;
    height: 30pxl;
  }

  @media (width) {
    width: 109px;
    height: 28px;
    font-size: 12px;
  }
`
