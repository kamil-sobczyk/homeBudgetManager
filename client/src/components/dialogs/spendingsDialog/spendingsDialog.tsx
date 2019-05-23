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
import { Legend } from './spendingsTable/legend';

interface SpendingsDialogProps {
  setVisibleDialog: (dialog?: string) => string;
  visibleDialog: string;
  getCosts: () => void;
  costs: Cost[];

}

@observer
export class SpendingsDialog extends React.Component<SpendingsDialogProps, {}> {
  render() {
    const {
      getCosts,
      costs,
      setVisibleDialog,
      visibleDialog
    } = this.props;
    return (
      <>
        <Dialog
          open={visibleDialog === 'SpendingsDialog'}
          aria-label='shopping-you-made'
        >
          <StyledDialogTitle>Spendings you made</StyledDialogTitle>
          <Legend/>
          <DialogContent>
            <TableContainer getCosts={getCosts} costs={costs} />
            <CostsCounter costs={costs} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVisibleDialog()} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
