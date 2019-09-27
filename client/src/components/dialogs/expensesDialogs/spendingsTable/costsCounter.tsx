import * as React from 'react';

import styled from 'styled-components';

import { Cost, CostCategoryType } from '../../../../lib/interfaces';

import { Typography } from '@rmwc/typography';

import { ColoredIcon } from './legend/coloredIcon';
import { LegendColor, StyledLegendContainer } from './legend/legend';

export const getDateNow = () =>
  String(new Date().toLocaleString('en-GB')).slice(0, 17);

type CostCounterTime = string | Date;

interface CostCounterItem {
  color: LegendColor;
  category: CostCategoryType;
}

interface CostsCounterProps {
  costs: Cost[];
  time: CostCounterTime;
}

export class CostsCounter extends React.Component<CostsCounterProps, {}> {
  private readonly costCounterItems: CostCounterItem[] = [
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

  private countCosts = (
    costs: Cost[],
    time: CostCounterTime,
    category?: CostCategoryType
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

    if (category) {
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
    } else
      chosenCosts.map((cost: Cost) => {
        sumOfCosts += cost.count;
      });

    return sumOfCosts;
  };
  render() {
    const { costs, time } = this.props;

    return (
      <>
        <StyledTypography use='subtitle1'>
          {time === 'month' ? 'This month' : time} you spent{' '}
          {this.countCosts(costs, time)}zł:
        </StyledTypography>
        <StyledLegendContainer>
          {this.costCounterItems.map((item: CostCounterItem) => (
            <div key={item.color}>
              <ColoredIcon color={item.color} />
              <StyledCountContainer>
                {this.countCosts(costs, time, item.category) + ' zł'}
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
