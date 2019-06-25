import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Cost } from '../../../lib/interfaces';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { TableContainer } from '../expensesDialogs/spendingsTable/tableContainer';

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
      <StyledDialogContent>aa</StyledDialogContent>
      <DialogActions>
        <Button
          color='primary'
          icon='add'
          onClick={() => setVisibleDialog('CalendarAddDayCostDialog')}
        />
        <Button onClick={() => setVisibleDialog()} color='primary'>
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  )
);

export const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const StyledDialog = styled(Dialog)`
  display: flex;
  justify-content: center;
`;

export const StyledDialogContent = styled(DialogContent)`
  display: flex;
  justify-content: center;
  padding: 10px 15px 10px 15px;
`;
