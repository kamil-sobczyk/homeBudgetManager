import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { Item } from '../../lib/interfaces';

import { FailDialog } from './failDialog';
import { StyledDialogTitle } from './shoppingDialog';

interface AddDialogProps {
  toggleShowAddDialog: () => boolean;
  toggleShowFailDialog: () => void;
  addItem: () => void;
  changeNewItem: (event: React.FormEvent<EventTarget>) => void;
  items: Item[];
  selected: Item[];
  showFailDialog: boolean;
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
        <StyledDialogTitle>Add a new product</StyledDialogTitle>
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
