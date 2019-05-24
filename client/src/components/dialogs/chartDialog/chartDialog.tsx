import * as React from 'react';

import { observer } from 'mobx-react';

import { Cost } from '../../../lib/interfaces';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from '../spendingsDialog/spendingsDialog';

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

interface ChartDialogProps {
  costs: Cost[];
  visibleDialog: string;
  setVisibleDialog: () => string;
  getCosts: () => void;
}

@observer
export class ChartDialog extends React.Component<ChartDialogProps, {}> {
  componentDidMount = () => {
    this.props.getCosts();
  };
  render() {
    const { setVisibleDialog, visibleDialog, costs } = this.props;

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
