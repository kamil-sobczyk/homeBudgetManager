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

import { TableContainer } from './spendingsTable/tableContainer';
import { CostsCounter } from './spendingsTable/costsCounter';
import { Legend } from './spendingsTable/legend/legend';

interface SpendingsDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  getCosts: () => void;
  costs: Cost[];
  setChosenCost: (cost: Cost) => Cost;
}

export const SpendingsDialog = observer(
  ({
    getCosts,
    costs,
    setVisibleDialog,
    visibleDialog,
    setChosenCost
  }: SpendingsDialogProps) => (
    <StyledDialog
      open={visibleDialog === 'SpendingsDialog'}
      aria-label='shopping-you-made'
    >
      <StyledDialogTitle>Spendings you made</StyledDialogTitle>
      <Legend />
      <StyledDialogContent>
        <TableContainer
          getCosts={getCosts}
          costs={costs}
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          setChosenCost={setChosenCost}
        />
      </StyledDialogContent>
      <CostsCounter costs={costs} time='month' />
      <DialogActions>
        <Button
          color='primary'
          icon='bar_chart'
          onClick={() => setVisibleDialog('ChartDialog')}
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
  text-align: center;
  padding: 10px 15px 10px 15px
`;
