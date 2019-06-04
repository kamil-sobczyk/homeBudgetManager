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
}

export const SpendingsDialog = observer(
  ({
    getCosts,
    costs,
    setVisibleDialog,
    visibleDialog
  }: SpendingsDialogProps) => (
    <StyledDialog
      open={visibleDialog === 'SpendingsDialog'}
      aria-label='shopping-you-made'
    >
      <StyledDialogTitle>Spendings you made</StyledDialogTitle>
      <Legend />
      <DialogContent>
        <TableContainer getCosts={getCosts} costs={costs} />
      </DialogContent>
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
  margin-top: 20px;
`;

export const StyledDialog = styled(Dialog)`
  height: 100vh;
  padding-bottom: 15px;
`;
