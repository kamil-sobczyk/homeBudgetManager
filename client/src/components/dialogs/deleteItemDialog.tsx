import * as React from 'react';

import { observer } from 'mobx-react';
import { Item } from '../../lib/interfaces';

import {
  Dialog,
  DialogActions,

  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';

interface deleteItemDialogProps {
  deleteItem: (index: number) => void;
  setVisibleDialog: (dialog?: string) => string;
  visibleDialog: string;
  items: Item[];
  index: number;

}

@observer
export class DeleteItemDialog extends React.Component<deleteItemDialogProps, {}> {
  confirm = (): void => {
    const { deleteItem, index, setVisibleDialog } = this.props;

    deleteItem(index);
    setVisibleDialog();
  };

  render() {
    const {
      items,
      index,
      setVisibleDialog,
      visibleDialog
    } = this.props;

    return (
      <Dialog
        open={visibleDialog === 'DeleteItemDialog'}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <StyledDialogTitle id='alert-dialog-title'>Deleting product</StyledDialogTitle>
        <DialogContent id='alert-dialog-description'>
          Are you sure want to delete {items[index] ? items[index].name : ''} from your list?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setVisibleDialog()}
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
