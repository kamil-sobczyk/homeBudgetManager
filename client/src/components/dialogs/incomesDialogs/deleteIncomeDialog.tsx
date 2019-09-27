import * as React from 'react';

import { observer } from 'mobx-react';
import { Income } from '../../../lib/interfaces';

import { Dialog, DialogActions } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle, StyledDialogContent } from '../expensesDialogs/spendingsDialog';

interface DeleteIncomeDialogProps {
  deleteIncome: (income: Income) => void;
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  income: Income;
}

export const DeleteIncomeDialog = observer(
  ({
    income,
    setVisibleDialog,
    visibleDialog,
    deleteIncome
  }: DeleteIncomeDialogProps) => (
    <Dialog
      open={visibleDialog.includes('DeleteIncomeDialog')}
      aria-labelledby='Delete income dialog'
      aria-describedby='Do you want to delete income?'
    >
      <StyledDialogTitle>Deleting Income</StyledDialogTitle>
      <StyledDialogContent>
        Are you sure want to delete an income: {income.category}{' '}
        {income.info ? income.info : ''} - {income.date} with value {income.count}zł
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={() => setVisibleDialog("IncomesDialog")} color='primary'>
          No
        </Button>
        <Button onClick={() => deleteIncome(income)} color='primary' autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
);
