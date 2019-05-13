import * as React from 'react';

import { observer } from 'mobx-react';
import { Cost } from '../../lib/interfaces';

import { Card } from '@rmwc/card';
import { Typography } from '@rmwc/typography';

const countMothOutgoings = (costs: Cost[]) => {
  let sumOfCost: number = 0;

  if (costs.length > 0) {
    costs.forEach((item: Cost) => (sumOfCost += item.count));
  }
  return sumOfCost;
};

interface CostsCardProps {
  sortedCosts: Cost[];
}

@observer
export class CostsCard extends React.Component<CostsCardProps, {}> {
  render() {
    return (
      <Card>
        <Typography use='subtitle1'>
          This month you spent:{' '}
          {countMothOutgoings(this.props.sortedCosts) + ' zł'}
        </Typography>
      </Card>
    );
  }
}
