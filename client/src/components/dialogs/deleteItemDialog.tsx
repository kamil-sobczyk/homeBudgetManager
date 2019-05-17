import * as React from 'react';

import { observer } from 'mobx-react';
import { Item, ListType } from '../../lib/interfaces';

import {
  Dialog,
  DialogActions,

  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from './spendingsDialog';

interface deleteItemDialogProps {
  toggleShowdeleteItemDialog: (list: ListType, index: number) => void;
  deleteItem: (index: number) => void;
  items: Item[];
  showdeleteItemDialog: boolean;
  list: ListType;
  index: number;

}

@observer
export class DeleteItemDialog extends React.Component<deleteItemDialogProps, {}> {
  confirm = (): void => {
    const { deleteItem, list, index, toggleShowdeleteItemDialog } = this.props;

    deleteItem(index);
    toggleShowdeleteItemDialog(list, index);
  };

  render() {
    const {
      showdeleteItemDialog,
      toggleShowdeleteItemDialog,
      items,
      list,
      index
    } = this.props;

    const active = items[index] ? items[index].name : '';

    return (
      <Dialog
        open={showdeleteItemDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <StyledDialogTitle id='alert-dialog-title'>Deleting product</StyledDialogTitle>
        <DialogContent id='alert-dialog-description'>
          Are you sure want to delete {active} from your list?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => toggleShowdeleteItemDialog(list, 0)}
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
