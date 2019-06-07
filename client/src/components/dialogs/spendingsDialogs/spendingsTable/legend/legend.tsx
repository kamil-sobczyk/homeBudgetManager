import * as React from 'react';

import styled from 'styled-components';

import { ColoredIcon } from './coloredIcon';

export type LegendColor = 'black' | 'blue' | 'green' | 'red' | 'grey';

type LegendText = 'Shopping' | 'Bills' | 'Health' | 'Car' | 'Other';

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
    text: 'Other'
  }
];

export const Legend = () => (
  <StyledLegendContainer>
    {legendItems.map((item: LegendItem) => (
      <div>
        <StyledIconContainer key={item.color}>
          <ColoredIcon color={item.color} key={item.color} />
        </StyledIconContainer>
        <StyledDescriptionContainer>{item.text}</StyledDescriptionContainer>
      </div>
    ))}
  </StyledLegendContainer>
);

const StyledLegendContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledIconContainer = styled.div`
  display: flex;
  align-content: center;
  margin-bottom: 5px;
`;
const StyledDescriptionContainer = styled.div`
  text-align: center;
`;
