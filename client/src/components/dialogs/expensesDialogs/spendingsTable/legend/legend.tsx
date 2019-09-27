import * as React from 'react';

import styled from 'styled-components';

import { ColoredIcon } from './coloredIcon';

export type LegendColor = 'black' | 'blue' | 'green' | 'red' | 'grey';

type LegendText = 'Shopping' | 'Bills' | 'Health' | 'Car' | 'Other';

interface LegendItem {
  color: LegendColor;
  text: LegendText;
}

export class Legend extends React.Component<{}, {}> {
  private readonly legendItems: LegendItem[] = [
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

  render() {
    return (
      <StyledLegendContainer>
        {this.legendItems.map((item: LegendItem) => (
          <div key={item.color}>
            <StyledIconContainer key={item.color}>
              <ColoredIcon color={item.color} key={item.color} />
            </StyledIconContainer>
            <StyledDescriptionContainer>{item.text}</StyledDescriptionContainer>
          </div>
        ))}
      </StyledLegendContainer>
    );
  }
}

export const StyledLegendContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledIconContainer = styled.div`
  display: flex;
  align-content: center;
  margin-bottom: 5px;
`;
export const StyledDescriptionContainer = styled.div`
  text-align: center;
`;
