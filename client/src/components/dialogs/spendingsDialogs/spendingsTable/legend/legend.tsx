import * as React from 'react';

import styled from 'styled-components';

import { ColoredIcon } from './coloredIcon';

export const Legend = () => (
  <StyledLegendContainer>
    <ColoredIcon color='green' />
    Shopping
    <ColoredIcon color='blue' />
    Bills
  </StyledLegendContainer>
);

const StyledLegendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  height: 20px;
  overflow: hidden;
`;
