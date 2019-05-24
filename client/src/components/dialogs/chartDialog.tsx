import * as React from 'react';

import { observer } from 'mobx-react';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar
} from 'recharts';

const chartData = [
  {
    name: 'May',
    shopping: 4000,
    bills: 2400,
    amt: 2400
  },
  {
    name: 'June',
    shopping: 3000,
    bills: 1398,
    amt: 2210
  },
  {
    name: 'July',
    shopping: 2000,
    bills: 200,
    amt: 2290
  },
  {
    name: 'September',
    shopping: 2780,
    bills: 3908,
    amt: 2000
  },
  {
    name: 'October',
    shopping: 1890,
    bills: 4800,
    amt: 2181
  },
  {
    name: 'November',
    shopping: 2390,
    bills: 3800,
    amt: 2500
  },
  {
    name: 'December',
    shopping: 3490,
    bills: 4300,
    amt: 2100
  }
];

import { Cost } from '../../lib/interfaces';

interface ChartDialogProps {
  costs: Cost[];
  visibleDialog: string;
  setVisibleDialog: () => string;
  getCosts: () => void;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const getMonth = (stringDate: string): string =>
  months[Number(stringDate.slice(4, 5)) - 1];

@observer
export class ChartDialog extends React.Component<ChartDialogProps, {}> {
  componentDidMount = () => {
    this.props.getCosts();
  };
  render() {
    const { setVisibleDialog, visibleDialog, costs } = this.props;
    if (costs.length > 0) {
      console.log(JSON.stringify(costs[0]));
      console.log(getMonth(costs[0].date));

      

    //   const data = costs.map(cost => { {name: getMonth(cost.date), shopping: }

    //   })
    }

    return (
      <Dialog
        open={visibleDialog === 'ChartDialog'}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <StyledDialogTitle id='alert-dialog-title'>
          Your spendings
        </StyledDialogTitle>
        <DialogContent id='alert-dialog-description'>
          <BarChart width={730} height={250} data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='bills' fill='blue' />
            <Bar dataKey='shopping' fill='green' />
          </BarChart>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVisibleDialog()} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

// export const ChartDialog = observer(
//   ({ setVisibleDialog, visibleDialog, costs }: ChartDialogProps) => {
//     console.log(JSON.stringify(costs));
//     console.log(visibleDialog)

//     return (

//     );
//   }
// );
