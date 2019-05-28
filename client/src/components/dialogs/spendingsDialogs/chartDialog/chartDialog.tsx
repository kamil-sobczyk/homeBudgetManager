import * as React from 'react';

import { observer } from 'mobx-react';

import { Cost } from '../../../../lib/interfaces';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from '../spendingsDialog';
import { Chart } from './chart';

interface ChartDialogProps {
  costs: Cost[];
  visibleDialog: string;
  setVisibleDialog: () => void;
  getCosts: () => void;
}

@observer
export class ChartDialog extends React.Component<ChartDialogProps, {}> {
  render() {
    const { setVisibleDialog, visibleDialog, costs, getCosts } = this.props;

    return (
      <Dialog
        open={visibleDialog === 'ChartDialog'}
        aria-labelledby='Chart dialog'
        aria-describedby='Chart with all spendings'
      >
        <StyledDialogTitle>Your spendings</StyledDialogTitle>
        <DialogContent>
          <Chart costs={costs} getCosts={getCosts} />
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
