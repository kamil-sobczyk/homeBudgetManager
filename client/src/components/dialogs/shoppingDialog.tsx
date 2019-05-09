import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../listBox/listBox';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';

@observer
export class ShoppingDialog extends React.Component<StoreProps, {}> {
  render() {
    const { toggleShowShoppingDialog, showShoppingDialog } = this.props.store;
    return (
      <>
        <Dialog
          open={showShoppingDialog}
          //   onClose={showShoppingDialog}
          aria-label='shopping-you-made'
        >
          <DialogTitle>Shopping you made</DialogTitle>
          <DialogContent>
            {/*   <TableContainer {...this.props} />*/}
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
