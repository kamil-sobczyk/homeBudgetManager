import * as React from 'react';

import { observer } from 'mobx-react';

import { Cost } from '../../../lib/interfaces';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';

import {
  StyledDialogTitle,
  StyledDialogContent
} from '../expensesDialogs/spendingsDialog';
import { TableContainer } from '../expensesDialogs/spendingsTable/tableContainer';

interface CostManagerDialogProps {
  cost: Cost[];
  setVisibleDialog: (dialog?: string) => void;
  setChosenCost: (cost: Cost) => Cost;
  visibleDialog: string;
  prevVisibleDialog: string;
}

@observer
export class CostManagerDialog extends React.Component<
  CostManagerDialogProps,
  {}
> {
  render() {
    const {
      cost,
      visibleDialog,
      setVisibleDialog,
      setChosenCost,
      prevVisibleDialog
    } = this.props;

    return (
      <Dialog open={visibleDialog.includes('CostManager')}>
        <StyledDialogTitle>Cost</StyledDialogTitle>
        <StyledDialogContent>
          <TableContainer
            costs={cost}
            setVisibleDialog={setVisibleDialog}
            visibleDialog={visibleDialog}
            setChosenCost={setChosenCost}
          />
        </StyledDialogContent>
        <DialogActions>
          <Button
            color='primary'
            onClick={() =>
              setVisibleDialog(
                prevVisibleDialog !== ('DeleteCostDialog' || 'EditCostDialog')
                  ? prevVisibleDialog
                  : ''
              )
            }
          >
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={() => setVisibleDialog('EditCostDialog')}
          >
            Edit
          </Button>
          <Button
            color='primary'
            onClick={() => setVisibleDialog('DeleteCostDialog')}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
