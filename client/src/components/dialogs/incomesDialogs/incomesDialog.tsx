import * as React from 'react';

import { observer } from 'mobx-react';

import { DialogActions } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { IncomesTable } from './icomesTable';
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent
} from '../expensesDialogs/spendingsDialog';
import { Income } from '../../../lib/interfaces';

interface IncomesDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  setActiveIncome: (income: Income) => void;
  deleteIncome: (income: Income) => void;
  getIncomes: () => void;
  visibleDialog: string;
  incomes: Income[];
}

export const IncomesDialog = observer(
  ({
    setVisibleDialog,
    visibleDialog,
    incomes,
    getIncomes,
    deleteIncome,
    setActiveIncome
  }: IncomesDialogProps) => (
    <StyledDialog
      open={visibleDialog.includes('IncomesDialog')}
      aria-label='shopping-you-made'
    >
      <StyledDialogTitle>Your incomes</StyledDialogTitle>
      <StyledDialogContent>
        <IncomesTable
          incomes={incomes}
          getIncomes={getIncomes}
          deleteIncome={deleteIncome}
          setVisibleDialog={setVisibleDialog}
          setActiveIncome={setActiveIncome}
        />
      </StyledDialogContent>
      <DialogActions>
        <Button
          color='primary'
          icon='add'
          onClick={() => setVisibleDialog('IncomesCalendarDialog')}
        />
        <Button onClick={() => setVisibleDialog()} color='primary'>
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  )
);
