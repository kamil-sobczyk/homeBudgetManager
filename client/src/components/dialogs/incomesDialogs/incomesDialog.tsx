import * as React from 'react';

import { observer } from 'mobx-react';

import {
  DialogActions,
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { IncomesTable } from './icomesTable';
import { StyledDialog, StyledDialogTitle, StyledDialogContent } from '../expensesDialogs/spendingsDialog';

interface IncomesDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
}

export const IncomesDialog = observer(
  ({ setVisibleDialog, visibleDialog }: IncomesDialogProps) => (
    <StyledDialog
      open={visibleDialog === 'IncomesDialog'}
      aria-label='shopping-you-made'
    >
      <StyledDialogTitle>Your incomes</StyledDialogTitle>
      <StyledDialogContent>
      <IncomesTable/>
      
      
      </StyledDialogContent>
      <DialogActions>
        <Button
          color='primary'
          icon='add'
          onClick={() => setVisibleDialog('AddNewIncomeDialog')}
        />
        <Button onClick={() => setVisibleDialog()} color='primary'>
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  )
);
