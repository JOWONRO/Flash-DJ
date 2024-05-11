import { HTMLAttributes } from 'react'

import styled from '@emotion/styled'
import shadow from '@src/styles/shadow'

const Container = (props: HTMLAttributes<HTMLDivElement>) => {
  const { children, ...rest } = props

  return <StyledContainer {...rest}>{children}</StyledContainer>
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: white;
  ${shadow.default}
`

export default Container
