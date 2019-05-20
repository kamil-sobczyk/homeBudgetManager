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
import { Icon } from '@rmwc/icon';
import { CostsCounter } from './spendingsTable/costsCounter';

interface SpendingsDialogProps {
  setDialog: (dialog?: string) => string;
  getCosts: () => void;
  costs: Cost[];

  showDialog: string;
}

@observer
export class SpendingsDialog extends React.Component<SpendingsDialogProps, {}> {
  render() {
    const {
      getCosts,
      costs,
      setDialog,
      showDialog
    } = this.props;
    return (
      <>
        <Dialog
          open={showDialog === 'spendingsDialog'}
          aria-label='shopping-you-made'
        >
          <StyledDialogTitle>Spendings you made</StyledDialogTitle>
          <StyledLegendContainer>
            <StyledColorIcon
              icon={
                <div
                  style={{
                    background: 'green',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%'
                  }}
                />
              }
            />
            Shopping
            <StyledColorIcon
              icon={
                <div
                  style={{
                    background: 'blue',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%'
                  }}
                />
              }
            />
            Bills
          </StyledLegendContainer>
          <DialogContent>
            <TableContainer getCosts={getCosts} costs={costs} />
            <CostsCounter costs={costs} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog()} color='primary'>
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

const StyledLegendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

const StyledColorIcon = styled(Icon)`
  margin: 0 5px 0 25px;
`;
