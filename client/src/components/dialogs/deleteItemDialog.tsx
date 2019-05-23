import * as React from 'react';

import { observer } from 'mobx-react';
import { Item } from '../../lib/interfaces';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';

interface DeleteItemDialogProps {
  deleteItem: (index: number) => void;
  setVisibleDialog: (dialog?: string) => string;
  visibleDialog: string;
  items: Item[];
  index: number;
}

export const DeleteItemDialog = observer(
  ({
    items,
    index,
    setVisibleDialog,
    visibleDialog,
    deleteItem
  }: DeleteItemDialogProps) => (
    <Dialog
      open={visibleDialog === 'DeleteItemDialog'}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <StyledDialogTitle id='alert-dialog-title'>
        Deleting product
      </StyledDialogTitle>
      <DialogContent id='alert-dialog-description'>
        Are you sure want to delete {items[index] ? items[index].name : ''} from
        your list?
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setVisibleDialog()} color='primary'>
          No
        </Button>
        <Button onClick={() => deleteItem(index)} color='primary' autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
);
