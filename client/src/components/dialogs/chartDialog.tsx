import * as React from 'react';

import { observer } from 'mobx-react';

import { Cost } from '../../lib/interfaces';

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
import { number } from 'prop-types';

const chartData = [
  {
    name: 'May',
    shopping: 4000,
    bills: 2400
  },
  {
    name: 'June',
    shopping: 3000,
    bills: 1398
  },
  {
    name: 'July',
    shopping: 2000,
    bills: 200
  },
  {
    name: 'September',
    shopping: 2780,
    bills: 3908
  },
  {
    name: 'October',
    shopping: 1890,
    bills: 4800
  },
  {
    name: 'November',
    shopping: 2390,
    bills: 3800
  },
  {
    name: 'December',
    shopping: 3490,
    bills: 4300
  }
];

interface ChartDialogProps {
  costs: Cost[];
  visibleDialog: string;
  setVisibleDialog: () => string;
  getCosts: () => void;
}

interface Spending {
  name: String;
  shopping: number;
  bills: number;
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

const monthNumbers = months.map((month, index) =>
  ('0' + (index + 1)).slice(-2)
);

console.log('mmmm', monthNumbers);

const getBillsCount = (costs: Cost[], month: string): number => {
  let sumOfBills: number = 0;

  costs.forEach(cost => {
    if (cost.bill) {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfBills += cost.count;
      }
    }
  });

  return sumOfBills;
};

const getShoppingCount = (costs: Cost[], month: string): number => {
  let sumOfShoppings: number = 0;

  costs.forEach(cost => {
    if (!cost.bill) {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfShoppings += cost.count;
      }
    }
  });

  return sumOfShoppings;
};

interface Spendings {
  bills: number;
  shopping: number;
  total?: number;
}

const splitCosts = (costs: Cost[]): [] => {
  let monthSpendings: any = [];
  months.forEach((month, index) =>
    monthSpendings.push({
      name: month,
      bills: getBillsCount(costs, monthNumbers[index]),
      shopping: getShoppingCount(costs, monthNumbers[index])
    })
  );

monthSpendings.forEach((month: Spendings) => {
    month.total = month.bills + month.shopping
});

  console.log(monthSpendings);

  return monthSpendings;
};

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
      splitCosts(costs);
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
          <BarChart width={730} height={250} data={splitCosts(costs)}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='bills' fill='blue' />
            <Bar dataKey='shopping' fill='green' />
            <Bar dataKey='total' fill='red' />
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
