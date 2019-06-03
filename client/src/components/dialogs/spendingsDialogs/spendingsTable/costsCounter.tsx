import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';

import { Cost, CategoryType } from '../../../../lib/interfaces';
import { LegendColor } from './legend/legend';

import { Typography } from '@rmwc/typography';

import { ColoredIcon } from './legend/coloredIcon';

const countCosts = (costs: Cost[], category: CategoryType) => {
  let sumOfCosts: number = 0;
  let monthCosts: Cost[] = [];
  let dateNow = String(
    new Date().toLocaleDateString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    })
  );

  if (dateNow.length < 17) {
    dateNow = `0${dateNow}`;
  }

  if (costs.length > 0) {
    monthCosts = costs.filter(
      cost => cost.date[3] === dateNow[3] && cost.date[4] === dateNow[4]
    );
  }

  monthCosts.forEach((cost: Cost) => {
    if (category === 'shopping' && cost.category === 'shopping') {
      sumOfCosts += cost.count;
    } else if (category === 'bill' && cost.category === 'bill') {
      sumOfCosts += cost.count;
    } else if (category === 'car' && cost.category === 'car') {
      sumOfCosts += cost.count;
    } else if (category === 'health' && cost.category === 'health') {
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
        {costCounterItems.map((item: CostCounterItem) => (
          <>
            <ColoredIcon color={item.color} key={item.color} />
            {countCosts(costs, item.category) + ' zł'}
          </>
        ))}
      </>
    );
  }
}

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
