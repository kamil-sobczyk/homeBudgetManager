import * as React from 'react';

import { observer } from 'mobx-react';
import { Item, DeleteItemDialogLangData } from '../../../lib/interfaces';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';

interface DeleteItemDialogProps {
  deleteItem: (name: string, info: string) => Item[];
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  items: Item[];
  index: number;
  langData: DeleteItemDialogLangData;
}

export const DeleteItemDialog = observer(
  ({
    items,
    index,
    setVisibleDialog,
    visibleDialog,
    deleteItem,
    langData
  }: DeleteItemDialogProps) => (
    <Dialog
      open={visibleDialog === 'DeleteItemDialog'}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <StyledDialogTitle>{langData.title}</StyledDialogTitle>
      <DialogContent>
        {langData.text1}
        {items[index] ? items[index].name : ''} {langData.text2}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setVisibleDialog()} color='primary'>
          {langData.buttons.cancel}
        </Button>
        <Button
          onClick={() => deleteItem(items[index].name, items[index].info)}
          color='primary'
          autoFocus
        >
          {langData.buttons.ok}
        </Button>
      </DialogActions>
    </Dialog>
  )
);
