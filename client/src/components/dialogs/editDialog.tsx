import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';
import { Item } from '../../lib/interfaces';
import { ActiveItem } from '../../lib/interfaces';
import { ListType } from '../../lib/mobx/stores/itemMenagerClient';

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
    const {
      itemMenagerClient: { editItem },
      visibilityClient: { toggleShowEditDialog }
    } = this.props.store;
    const { list, index } = activeItem;

    const newItem = this.state;
    if (newItem.name === '') {
      newItem.name = (this.props.store as any)[list][index].name;
    } else {
      newItem.name = this.state.name;
    }

    // editItemOnServer(newState, activeItem);
    editItem(newItem, list as ListType, index);
    toggleShowEditDialog(list, index);
    this.setState(initialState);
  };

  changeNewItem = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    const { list, index } = this.props.store.itemMenagerClient.activeItem;

    if (list === 'items' && this.props.store.items[index]) {
      if (target.name === 'name') {
        this.setState({
          name: event ? target.value : this.props.store.items[index].name
        });
      } else {
        this.setState({
          name: event ? target.value : this.props.store.items[index].info
        });
      }
    } else if (list === 'selected' && this.props.store.selected[index]) {
      if (target.name === 'name') {
        this.setState({
          name: event ? target.value : this.props.store.selected[index].name
        });
      } else {
        this.setState({
          name: event ? target.value : this.props.store.selected[index].info
        });
      }
    }
  };
  render() {
    const {
      itemMenagerClient: {
        activeItem,
        activeItem: { list, index }
      },
      visibilityClient: { showEditDialog, toggleShowEditDialog }
    } = this.props.store;

    let defaultName;
    let defaultInfo;

    if ((this.props.store as any)[list][index]) {
      if (list === 'items') {
        defaultName = this.props.store.items[index].name;
        defaultInfo = this.props.store.items[index].info;
      } else {
        defaultName = this.props.store.selected[index].name;
        defaultInfo = this.props.store.selected[index].info;
      }
    }

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
          name='name'
          //   margin="normal"
          //   variant="outlined"
          onChange={this.changeNewItem}
        />
        <TextField
          id='outlined'
          label='Type new additional info'
          defaultValue={defaultInfo}
          name='info'
          //   margin="normal"
          //   variant="outlined"
          onChange={this.changeNewItem}
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
