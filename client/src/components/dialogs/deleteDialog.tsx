import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps, Item } from '../../lib/interfaces';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { ListType } from '../../lib/mobx/stores/itemMenagerClient';

interface DeleteDialogProps {
  items: Item[];
  list: ListType;
  index: number;
  deleteItem: (index: number) => void;
  toggleShowDeleteDialog: (list: ListType, index: number) => void;
  showDeleteDialog: boolean;
}

@observer
export class DeleteDialog extends React.Component<DeleteDialogProps, {}> {
  confirm = (): void => {
    const { deleteItem, list, index, toggleShowDeleteDialog } = this.props;

    deleteItem(index);
    toggleShowDeleteDialog(list, index);
  };

  render() {
    const {
      showDeleteDialog,
      toggleShowDeleteDialog,
      items,
      list,
      index
    } = this.props;

    const active = items[index] ? items[index].name : '';

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
            onClick={(): void => toggleShowDeleteDialog(list, 0)}
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
