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
import '@material/typography/dist/mdc.typography.css';

import { TableContainer } from './spendingsTable/tableContainer';

interface SpendingsDialogProps {
  getCosts: () => void;
  toggleShowSpendingsDialog: () => void;
  costs: Cost[];
  showSpendingsDialog: boolean;
}

@observer
export class SpendingsDialog extends React.Component<SpendingsDialogProps, {}> {
  render() {
    const {
      toggleShowSpendingsDialog,
      showSpendingsDialog,
      getCosts,
      costs
    } = this.props;
    return (
      <>
        <Dialog open={showSpendingsDialog} aria-label='shopping-you-made'>
          <StyledDialogTitle>Spendings you made</StyledDialogTitle>
          <DialogContent>
            <TableContainer getCosts={getCosts} costs={costs} />
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleShowSpendingsDialog} color='primary'>
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
