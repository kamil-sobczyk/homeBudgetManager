import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { Item } from '../../lib/interfaces';

import { FailDialog } from './failDialog';

interface AddDialogProps {
  addItem: () => void;
  toggleShowAddDialog: () => boolean;
  toggleShowFailDialog: () => void;
  changeNewItem: (event: React.FormEvent<EventTarget>) => void;
  showFailDialog: boolean;
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
      toggleShowFailDialog,
      showFailDialog,
      changeNewItem,
      addItem
    } = this.props;

    return (
      <Dialog open={showAddDialog}>
        <DialogTitle>Add a new product</DialogTitle>
        <TextField
          defaultValue={''}
          id='outlined-required'
          label='New item'
          name='name'
          onChange={(e: React.FormEvent<any>) => this.onItemChange(e)}
        />
        <TextField
          defaultValue={''}
          id='outlined'
          label='Additional info'
          name='info'
          onChange={(e: React.FormEvent<any>) => changeNewItem(e)}
        />
        <DialogActions>
          <Button color='primary' onClick={toggleShowAddDialog}>
            Cancel
          </Button>
          <Button color='primary' onClick={() => addItem()}>
            Add
          </Button>
        </DialogActions>
        <FailDialog
          showFailDialog={showFailDialog}
          toggleShowFailDialog={toggleShowFailDialog}
        />
      </Dialog>
    );
  }
}
