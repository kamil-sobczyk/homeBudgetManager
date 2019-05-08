import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../listBox';
import { Item } from '../../lib/interfaces';
import { ActiveItem } from '../../lib/App/store';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

const initialState: Item = {
  name: '',
  info: '',
  id: String(Date.now()),
  checked: false
};

@observer
export class EditDialog extends React.Component<StoreProps, Item> {
  state = initialState;

  handleCloseEdit = (activeItem: ActiveItem): void => {
    const { editItem, toggleShowEditDialog } = this.props.store;
    const { list, index } = activeItem;

    const newItem = this.state;
    if (newItem.name === '') {
      newItem.name = (this.props.store as any)[list][index].name;
    } else {
      newItem.name = this.state.name;
    }

    // editItemOnServer(newState, activeItem);
    editItem(newItem, list, index);
    toggleShowEditDialog(list, index);
    this.setState(initialState);
  };

  changeNewItem = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    const { list, index } = this.props.store.activeItem;

    this.setState({
      name: event ? target.value : (this.props.store as any)[list][index].name
    });
  };

  changeNewItemInfo = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    const { list, index } = this.props.store.activeItem;
    this.setState({
      info: event ? target.value : (this.props.store as any)[list][index].info
    });
  };

  render() {
    const {
      showEditDialog,
      activeItem,
      activeItem: { list, index },
      toggleShowEditDialog
    } = this.props.store;

    let defaultName;
    let defaultInfo;

    if ((this.props.store as any)[list][index]) {
      defaultName = (this.props.store as any)[list][index].name;
      defaultInfo = (this.props.store as any)[list][index].info;
    } else {
      defaultName = ' ';
      defaultName = ' ';
    }

    // const defaultName = !(this.props.store as any)[list][index] ? " " : (this.props.store as any)[list][index].name;
    // const defaultInfo  = !(this.props.store as any)[list][index] ? " " : (this.props.store as any)[list][index].info;

    return (
      <Dialog
        open={showEditDialog}
        //   TransitionComponent={Transition}
      >
        <DialogTitle>Edit product</DialogTitle>
        <TextField
          id='outlined-required'
          label='Type new name'
          defaultValue={defaultName}
          //   margin="normal"
          //   variant="outlined"
          onChange={this.changeNewItem}
        />
        <TextField
          id='outlined'
          label='Type new additional info'
          defaultValue={defaultInfo}
          //   margin="normal"
          //   variant="outlined"
          onChange={this.changeNewItemInfo}
        />
        <DialogActions>
          <Button
            color='primary'
            onClick={() => toggleShowEditDialog(list, index)} //////////////////////////////////////////
          >
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={this.handleCloseEdit.bind(this, activeItem)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
