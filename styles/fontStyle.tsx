import { css } from 'styled-components'

export const fontStyle = (size: number, weight: number) => {
  return css`
    font-size: ${(size * 0.1).toFixed(3)}rem;
    font-style: normal;
    font-weight: ${weight};
    line-height: normal;
  `
}
