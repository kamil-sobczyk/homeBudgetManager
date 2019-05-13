import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';

import { TableContainer } from '../shoppingTable/tableContainer';

@observer
export class ShoppingDialog extends React.Component<StoreProps, {}> {
  render() {
    const {
      toggleShowShoppingDialog,
      showShoppingDialog
    } = this.props.store.visibilityClient;
    return (
      <>
        <Dialog open={showShoppingDialog} aria-label='shopping-you-made'>
          <DialogTitle>
            <StyledTypography use='headline6'>
              Shopping you made
            </StyledTypography>
          </DialogTitle>
          <DialogContent>
            <TableContainer {...this.props} />
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

`;
