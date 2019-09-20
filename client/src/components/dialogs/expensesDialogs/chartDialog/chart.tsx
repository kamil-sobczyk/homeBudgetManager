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
  },
  { color: 'grey', key: 'other' }
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
      <BarChart width={335} height={250} data={splitCosts(this.props.costs)}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        {chartLegendBars.map(item => (
          <Bar dataKey={item.key} fill={item.color} key={item.key} />
        ))}
      </BarChart>
    );
  }
}
