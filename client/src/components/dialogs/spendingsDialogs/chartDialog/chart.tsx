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
        <Bar dataKey='bills' fill='blue' />
        <Bar dataKey='shopping' fill='black' />
        <Bar dataKey='health' fill='green' />
        <Bar dataKey='car' fill='red' />
      </StyledBarChart>
    );
  }
}

const StyledBarChart = styled(BarChart)`
  margin-left: -40px;
`;
