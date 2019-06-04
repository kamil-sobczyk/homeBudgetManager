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
      <div key={item.color}>
        <ColoredIcon color={item.color} key={item.color} />
        {item.text}
      </div>
    ))}
  </StyledLegendContainer>
);

const StyledLegendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 5px;
  height: 20px;
`;
