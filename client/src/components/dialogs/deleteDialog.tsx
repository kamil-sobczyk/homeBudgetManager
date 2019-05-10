import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';

@observer
export class DeleteDialog extends React.Component<StoreProps, {}> {
  confirm = (): void => {
    const {
      itemMenagerClient: {
        deleteItem,
        activeItem: { index }
      },
      visibilityClient: { toggleShowDeleteDialog }
    } = this.props.store;

    deleteItem(index);
    toggleShowDeleteDialog();
  };

  render() {
    const {
      visibilityClient: { showDeleteDialog, toggleShowDeleteDialog },
      itemMenagerClient: {
        activeItem: { index }
      }
    } = this.props.store;

    const active = this.props.store.items[index]
      ? this.props.store.items[index].name
      : '';

    return (
      <Dialog
        open={showDeleteDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>"Deleting product"</DialogTitle>
        <DialogContent id='alert-dialog-description'>
          Are you sure want to delete {active} from your list?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(): void => toggleShowDeleteDialog()}
            color='primary'
          >
            No
          </Button>
          <Button onClick={this.confirm} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
