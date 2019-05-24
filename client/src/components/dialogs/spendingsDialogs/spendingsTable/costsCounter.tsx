import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Cost } from '../../../../lib/interfaces';

import { Typography } from '@rmwc/typography';
import { ColoredIcon } from './legend/coloredIcon';

const countCosts = (costs: Cost[], category: string) => {
  let sumOfCosts: number = 0;
  let monthCosts: Cost[] = [];
  const dateNow = String(
    new Date().toLocaleDateString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    })
  );

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

interface CostsCounterProps {
  costs: Cost[];
}

export const CostsCounter = observer(({ costs }: CostsCounterProps) => (
  <StyledTypography use='subtitle1'>
    This month you spent:
    <ColoredIcon color='black' />
    {countCosts(costs, 'shopping') + ' zł'}
    <ColoredIcon color='blue' />
    {countCosts(costs, 'bill') + ' zł'}
    <ColoredIcon color='green' />
    {countCosts(costs, 'health') + ' zł'}
    <ColoredIcon color='red' />
    {countCosts(costs, 'car') + ' zł'}
  </StyledTypography>
));

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
