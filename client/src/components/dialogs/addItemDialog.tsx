import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { Item } from '../../lib/interfaces';

import { StyledDialogTitle } from './spendingsDialog';

interface AddItemDialogProps {
  toggleshowAddItemDialog: () => boolean;
  addItem: () => void;
  changeNewItem: (event: React.FormEvent<EventTarget>) => void;
  items: Item[];
  selected: Item[];
  showAddItemDialog: boolean;
}

@observer
export class AddItemDialog extends React.Component<AddItemDialogProps, Item> {
  onItemChange = (e: React.FormEvent<any>) => {
    this.props.changeNewItem(e);
  };

  render() {
    const {
      showAddItemDialog,
      toggleshowAddItemDialog,
      changeNewItem,
      addItem
    } = this.props;

    return (
      <Dialog open={showAddItemDialog}>
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
          <Button color='primary' onClick={toggleshowAddItemDialog}>
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
