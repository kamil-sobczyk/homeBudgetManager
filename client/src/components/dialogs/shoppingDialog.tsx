import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Cost } from '../../lib/interfaces';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';
import '@material/typography/dist/mdc.typography.css';

import { TableContainer } from '../shoppingTable/tableContainer';

interface ShoppingDialogProps {
  getCosts: () => void;
  toggleShowShoppingDialog: () => void;
  costs: Cost[];
  showShoppingDialog: boolean;
}

@observer
export class ShoppingDialog extends React.Component<ShoppingDialogProps, {}> {
  render() {
    const {
      toggleShowShoppingDialog,
      showShoppingDialog,
      getCosts,
      costs
    } = this.props;
    return (
      <>
        <Dialog open={showShoppingDialog} aria-label='shopping-you-made'>
          <DialogTitle>
            <StyledTypography use='headline6'>
              Shopping you made
            </StyledTypography>
          </DialogTitle>
          <DialogContent>
            <TableContainer getCosts={getCosts} costs={costs} />
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleShowShoppingDialog} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
`;
