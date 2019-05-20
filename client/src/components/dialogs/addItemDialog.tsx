import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { Item } from '../../lib/interfaces';

import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';

interface AddItemDialogProps {
  addItem: () => void;
  changeNewItem: (event: React.FormEvent<EventTarget>) => void;
  setVisibleDialog: (dialog?: string) => string;
  visibleDialog: string;
  items: Item[];
  selected: Item[];
}

@observer
export class AddItemDialog extends React.Component<AddItemDialogProps, Item> {
  onItemChange = (e: React.FormEvent<any>) => {
    this.props.changeNewItem(e);
  };

  render() {
    const {
      changeNewItem,
      addItem,
      setVisibleDialog,
      visibleDialog
    } = this.props;

    return (
      <Dialog open={visibleDialog === 'AddItemDialog'}>
        <StyledDialogTitle>Add a new product</StyledDialogTitle>
        <TextField
          defaultValue={''}
          id='outlined-required'
          label='New item'
          name='name'
          onChange={e => this.onItemChange(e)}
        />
        <TextField
          defaultValue={''}
          id='outlined'
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
    );
  }
}
