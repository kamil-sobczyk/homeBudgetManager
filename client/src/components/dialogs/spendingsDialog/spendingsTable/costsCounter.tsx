import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Cost } from '../../../../lib/interfaces';

import { Typography } from '@rmwc/typography';
import { ColoredIcon } from './legend/coloredIcon';

const countCosts = (costs: Cost[], bill?: string) => {
  let sumOfCosts: number = 0;

  if (costs.length > 0) {
    costs.forEach((cost: Cost) => {
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
  }

  return sumOfCosts;
};

interface CostsCounterProps {
  costs: Cost[];
}

@observer
export class CostsCounter extends React.Component<CostsCounterProps, {}> {
  render() {
    const { costs } = this.props;
    return (
      <StyledTypography use='subtitle1'>
        This month you spent: 
        <ColoredIcon color='green' />
        {countCosts(costs) + ' zł'} 
        <ColoredIcon color='blue' />
        {countCosts(costs, 'bill') + ' zł'}
      </StyledTypography>
    );
  }
}

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
