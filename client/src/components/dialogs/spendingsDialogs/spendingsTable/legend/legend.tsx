import * as React from 'react';

import styled from 'styled-components';

import { ColoredIcon } from './coloredIcon';

export type LegendColor = 'black' | 'blue' | 'green' | 'red';

type LegendText = 'Shopping' | 'Bills' | 'Health' | 'Car';

interface LegendItem {
  color: LegendColor;
  text: LegendText;
}

const legendItems: LegendItem[] = [
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
    {legendItems.map((item: LegendItem) => (
      <>
        <ColoredIcon color={item.color} key={item.color} />
        {item.text}
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
