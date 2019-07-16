import * as React from 'react';

import { observer } from 'mobx-react';
import { Cost } from '../../../lib/interfaces';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';
import styled from 'styled-components';

interface DeleteCostDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  deleteCost: (cost: Cost) => void;
  visibleDialog: string;
  cost: Cost;
  prevVisibleDialog: string;
}

export const DeleteCostDialog = observer(
  ({
    cost,
    visibleDialog,
    setVisibleDialog,
    prevVisibleDialog,
    deleteCost
  }: DeleteCostDialogProps) => (
    <Dialog
      open={visibleDialog === 'DeleteCostDialog'}
      aria-labelledby='delete-dialog-title'
      aria-describedby='delete-dialog-description'
    >
      <StyledDialogTitle>Deleting</StyledDialogTitle>
      <StyledDeleteDialogContent>
        Are you sure want to delete cost added {cost.date} - {cost.chosenItems}{' '}
        from your list of expenses?
      </StyledDeleteDialogContent>
      <DialogActions>
        <Button
          onClick={() => setVisibleDialog(prevVisibleDialog)}
          color='primary'
        >
          No
        </Button>
        <Button onClick={() => deleteCost(cost)} color='primary' autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
);

const StyledDeleteDialogContent = styled(DialogContent)`
  text-align: center;
`;
