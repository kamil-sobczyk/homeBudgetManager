import * as React from 'react';

import styled from 'styled-components';

import { Cost, CostCategoryType } from '../../../../lib/interfaces';

import { Typography } from '@rmwc/typography';

import { ColoredIcon } from './legend/coloredIcon';
import { LegendColor, StyledLegendContainer } from './legend/legend';

export const getDateNow = () =>
  String(new Date().toLocaleString('en-GB')).slice(0, 17);

const countCosts = (
  costs: Cost[],
  category: CostCategoryType,
  time: CostCounterTime
) => {
  let sumOfCosts: number = 0;
  let chosenCosts: Cost[] = costs;

  if (time === 'month') {
    if (costs.length > 0) {
      chosenCosts = costs.filter(
        cost => cost.date.slice(3, 5) === getDateNow().slice(3, 5)
      );
    }
  }

  chosenCosts.map((cost: Cost) => {
    if (category === 'shopping' && cost.category === 'shopping') {
      sumOfCosts += cost.count;
    } else if (category === 'bill' && cost.category === 'bill') {
      sumOfCosts += cost.count;
    } else if (category === 'car' && cost.category === 'car') {
      sumOfCosts += cost.count;
    } else if (category === 'health' && cost.category === 'health') {
      sumOfCosts += cost.count;
    } else if (category === 'other' && cost.category === 'other') {
      sumOfCosts += cost.count;
    }
  });

  return sumOfCosts;
};

const costCounterItems: CostCounterItem[] = [
  {
    color: 'black',
    category: 'shopping'
  },
  {
    color: 'blue',
    category: 'bill'
  },
  {
    color: 'green',
    category: 'health'
  },
  {
    color: 'red',
    category: 'car'
  },
  {
    color: 'grey',
    category: 'other'
  }
];

interface CostCounterItem {
  color: LegendColor;
  category: CostCategoryType;
}

type CostCounterTime = string | Date;

interface CostsCounterProps {
  costs: Cost[];
  time: CostCounterTime;
}

export class CostsCounter extends React.Component<CostsCounterProps, {}> {
  render() {
    const { costs, time } = this.props;

    return (
      <>
        <StyledTypography use='subtitle1'>
          {time === 'month' ? 'This month' : time} you spent:
        </StyledTypography>
        <StyledLegendContainer>
          {costCounterItems.map((item: CostCounterItem) => (
            <div key={item.color}>
              <ColoredIcon color={item.color} />
              <StyledCountContainer>
                {countCosts(costs, item.category, time) + ' zł'}
              </StyledCountContainer>
            </div>
          ))}
        </StyledLegendContainer>
      </>
    );
  }
}

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
`;

const StyledCountContainer = styled.div`
  margin-left: 5px;
  display: inline-block;
`;
