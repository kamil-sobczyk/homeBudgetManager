import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Cost } from '../../../../lib/interfaces';

import { Typography } from '@rmwc/typography';
import { ColoredIcon } from './legend/coloredIcon';

const countCosts = (costs: Cost[], bill?: string) => {
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
    if (bill) {
      if (cost.bill) {
        sumOfCosts += cost.count;
      }
    } else {
      if (!cost.bill) {
        sumOfCosts += cost.count;
      }
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
    <ColoredIcon color='green' />
    {countCosts(costs) + ' zł'}
    <ColoredIcon color='blue' />
    {countCosts(costs, 'bill') + ' zł'}
  </StyledTypography>
));

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
