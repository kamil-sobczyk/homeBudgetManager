import * as React from "react";

import styled from "styled-components";

import { Cost } from "../../lib/App/store";

import { Card, CardAction } from "@rmwc/card";
import { Typography } from "@rmwc/typography";

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

export class CostsCard extends React.Component<CostsCardProps, {}> {
  render() {
    return (
      <Card>
        <CardAction>
          <Typography use="subtitle1">This month you spent:</Typography>
          <Typography use="subtitle2">
            {countMothOutgoings(this.props.sortedCosts) + " zł"}
          </Typography>
        </CardAction>
      </Card>
    );
  }
}
