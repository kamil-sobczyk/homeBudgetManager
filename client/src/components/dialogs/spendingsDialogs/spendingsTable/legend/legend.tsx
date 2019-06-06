import * as React from 'react';

import styled from 'styled-components';

import { ColoredIcon } from './coloredIcon';

export type LegendColor = 'black' | 'blue' | 'green' | 'red' | 'grey';

type LegendText = 'Shopping' | 'Bills' | 'Health' | 'Car' | 'other';

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
  },
  {
    color: 'grey',
    text: 'other'
  }
];

export const Legend = () => (
  <StyledLegendContainer>
    {legendItems.map((item: LegendItem) => (
      <StyledIconContainer key={item.color}>
        <ColoredIcon color={item.color} key={item.color} />
        {item.text}
      </StyledIconContainer>
    ))}
  </StyledLegendContainer>
);

const StyledLegendContainer = styled.div`
  display: flex;
  margin: 5px 25px 0 0;
  height: 20px;

`;

const StyledIconContainer = styled.div`
  padding: 0;
  padding-left: -10px;
`;
