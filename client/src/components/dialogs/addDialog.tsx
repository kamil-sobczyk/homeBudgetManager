import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { Item } from '../../lib/interfaces';

import { StyledDialogTitle } from './shoppingDialog';

interface AddDialogProps {
  toggleShowAddDialog: () => boolean;
  addItem: () => void;
  changeNewItem: (event: React.FormEvent<EventTarget>) => void;
  items: Item[];
  selected: Item[];
  showAddDialog: boolean;
}

@observer
export class AddDialog extends React.Component<AddDialogProps, Item> {
  onItemChange = (e: React.FormEvent<any>) => {
    this.props.changeNewItem(e);
  };

  render() {
    const {
      showAddDialog,
      toggleShowAddDialog,
      changeNewItem,
      addItem
    } = this.props;

    return (
      <Dialog open={showAddDialog}>
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
          <Button color='primary' onClick={toggleShowAddDialog}>
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
