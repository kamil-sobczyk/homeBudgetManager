import * as React from 'react';

import { observer } from 'mobx-react';

import { Cost } from '../../../../lib/interfaces';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar
} from 'recharts';

import { splitCosts } from './dataFunctions';
import styled from 'styled-components';

const chartLegendBars = [
  {
    color: 'blue',
    key: 'bills'
  },
  {
    color: 'black',
    key: 'shopping'
  },
  {
    color: 'green',
    key: 'health'
  },
  {
    color: 'red',
    key: 'car'
  }
];

interface ChartProps {
  costs: Cost[];
  getCosts: () => void;
}

@observer
export class Chart extends React.Component<ChartProps, {}> {
  componentDidMount = () => {
    this.props.getCosts();
  };
  render() {
    return (
      <StyledBarChart
        width={335}
        height={250}
        data={splitCosts(this.props.costs)}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        {chartLegendBars.map(item => (
          <Bar dataKey={item.key} fill={item.color} />
        ))}
      </StyledBarChart>
    );
  }
}

const StyledBarChart = styled(BarChart)`
  margin-left: -40px;
`;
