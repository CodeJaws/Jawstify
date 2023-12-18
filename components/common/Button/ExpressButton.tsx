import styled from 'styled-components'

interface ExpressButtonProps {
  size: string
}

function ExpressButton({ size }: ExpressButtonProps) {
  return (
    <Div>
      <AcceptButton $size={size}>수락</AcceptButton>
      <RejectButton $size={size}>거절</RejectButton>
    </Div>
  )
}

export default ExpressButton

const Div = styled.div`
  display: flex;
  gap: 10px;
`

const AcceptButton = styled.button<{ $size: string }>`
  border: none;
  cursor: pointer;
  display: flex;
  width: ${({ $size }) => ($size === 'desktop' ? '84px' : $size === 'tablet' ? '72px' : '109px')};
  height: ${({ $size }) => ($size === 'desktop' ? '32px' : $size === 'tablet' ? '30px' : '28px')};
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #5534da;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`
const RejectButton = styled.button<{ $size: string }>`
  border: none;
  cursor: pointer;
  display: flex;
  width: ${({ $size }) => ($size === 'desktop' ? '84px' : $size === 'tablet' ? '72px' : '109px')};
  height: ${({ $size }) => ($size === 'desktop' ? '32px' : $size === 'tablet' ? '30px' : '28px')};
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #5534da;
  font-size: 14px;
  font-weight: 500;
`
