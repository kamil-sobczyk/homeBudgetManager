import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Cost } from '../../../../lib/interfaces';

import { Typography } from '@rmwc/typography';

const countMothOutgoings = (costs: Cost[]) => {
  let sumOfCost: number = 0;

  if (costs.length > 0) {
    costs.forEach((cost: Cost) => (sumOfCost += cost.count));
  }
  return sumOfCost;
};

interface CostsCounterProps {
  displayedCosts: Cost[];
}

@observer
export class CostsCounter extends React.Component<CostsCounterProps, {}> {
  render() {
    return (
      <StyledTypography use='subtitle1'>
        This month you spent:{' '}
        {countMothOutgoings(this.props.displayedCosts) + ' zł'}
      </StyledTypography>
    );
  }
}

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
