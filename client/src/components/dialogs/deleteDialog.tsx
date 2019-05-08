import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../listBox';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';

@observer
export class DeleteDialog extends React.Component<StoreProps, {}> {
  render() {
    const {
      showDeleteDialog,
      deleteItem,
      toggleShowDeleteDialog,
      activeItem,
      activeItem: { list, index }
    } = this.props.store;

    const active = (this.props.store as any)[list][index]
      ? (this.props.store as any)[list][index].name
      : '';
    return (
      <Dialog
        open={showDeleteDialog}
        // onClose={this.handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>"Deleting product"</DialogTitle>
        <DialogContent id='alert-dialog-description'>
          Are you sure want to delete {active} from your list?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleShowDeleteDialog.bind(this, 'items', 0)}
            color='primary'
          >
            No
          </Button>
          <Button
            onClick={deleteItem.bind(this, index)}
            color='primary'
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
