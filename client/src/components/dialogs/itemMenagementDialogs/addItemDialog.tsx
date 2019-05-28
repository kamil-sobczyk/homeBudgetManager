import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { Item } from '../../../lib/interfaces';

import { StyledDialogTitle } from '../spendingsDialogs/spendingsDialog';

interface AddItemDialogProps {
  addItem: () => void;
  changeNewItem: (event: React.FormEvent<EventTarget>) => void;
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  items: Item[];
  selected: Item[];
}

export const AddItemDialog = observer(
  ({
    changeNewItem,
    addItem,
    setVisibleDialog,
    visibleDialog
  }: AddItemDialogProps) => (
    <Dialog open={visibleDialog === 'AddItemDialog'}>
      <StyledDialogTitle>Add a new product</StyledDialogTitle>
      <TextField
        defaultValue={''}
        label='New item'
        name='name'
        onChange={e => changeNewItem(e)}
      />
      <TextField
        defaultValue={''}
        label='Additional info'
        name='info'
        onChange={e => changeNewItem(e)}
      />
      <DialogActions>
        <Button color='primary' onClick={() => setVisibleDialog()}>
          Cancel
        </Button>
        <Button color='primary' onClick={addItem}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
);
