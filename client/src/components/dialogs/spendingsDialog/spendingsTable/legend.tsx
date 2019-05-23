import * as React from 'react';

import styled from 'styled-components';

import { Icon } from '@rmwc/icon';

export const Legend = () => (
  <StyledLegendContainer>
    <StyledColorIcon
      icon={
        <div
          style={{
            background: 'green',
            width: '10px',
            height: '10px',
            borderRadius: '50%'
          }}
        />
      }
    />
    Shopping
    <StyledColorIcon
      icon={
        <div
          style={{
            background: 'blue',
            width: '10px',
            height: '10px',
            borderRadius: '50%'
          }}
        />
      }
    />
    Bills
  </StyledLegendContainer>
);

const StyledLegendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

const StyledColorIcon = styled(Icon)`
  margin: 0 5px 0 25px;
`;
