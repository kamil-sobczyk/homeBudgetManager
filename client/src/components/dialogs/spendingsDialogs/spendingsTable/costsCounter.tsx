import * as React from 'react';

import styled from 'styled-components';

import { Cost, CategoryType } from '../../../../lib/interfaces';

import { Typography } from '@rmwc/typography';

import { ColoredIcon } from './legend/coloredIcon';
import { LegendColor } from './legend/legend';

export const getDateNow = () => {
  let dateNow = String(
    new Date().toLocaleDateString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    })
  ).replace(/\./g, '/');

  if (dateNow[2] !== '/') {
    dateNow = `0${dateNow}`;
  }
  dateNow = `${dateNow.slice(0, 10)}${dateNow.slice(11)}`;

  return dateNow;
};

const countCosts = (
  costs: Cost[],
  category: CategoryType,
  time: CostCounterTime
) => {
  let sumOfCosts: number = 0;
  let chosenCosts: Cost[] = costs;

  if (time === 'month') {
    if (costs.length > 0) {
      costs.forEach(cost => {
        cost.date = cost.date.replace(/\./g, '/');
        cost.date = cost.date.replace(/\,/g, '');
      });

      chosenCosts = costs.filter(
        cost => cost.date.slice(3, 5) === getDateNow().slice(3, 5)
      );
    }
  }

  chosenCosts.forEach((cost: Cost) => {
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
  category: CategoryType;
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
        <StyledCounterContainer>
          {costCounterItems.map((item: CostCounterItem) => (
            <div key={item.color}>
              <ColoredIcon color={item.color} />
              {countCosts(costs, item.category, time) + ' zł'}
            </div>
          ))}
        </StyledCounterContainer>
      </>
    );
  }
}

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
`;

const StyledCounterContainer = styled.div`
  display: flex;
  justify-content: center;
`;
