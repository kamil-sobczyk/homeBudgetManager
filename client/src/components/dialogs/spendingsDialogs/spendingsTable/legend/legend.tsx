import * as React from 'react';

import styled from 'styled-components';

import { ColoredIcon } from './coloredIcon';

const legendItems = [
  {
    color: 'black',
    text: 'Shopping'
  },
  {
    color: 'blue',
    text: 'Bills'
  },
  {
    color: 'green',
    text: 'Health'
  },
  {
    color: 'red',
    text: 'Car'
  }
];

export const Legend = () => (
  <StyledLegendContainer>
    {legendItems.map(item => (
      <>
        <ColoredIcon color={item.color} />
        {item.text}{' '}
      </>
    ))}
  </StyledLegendContainer>
);

const StyledLegendContainer = styled.div`
  margin: 10px 0 0 -30px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  height: 20px;
  overflow: hidden;
`;
