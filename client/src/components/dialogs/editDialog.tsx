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
  id: '',
  checked: false
};

@observer
export class EditDialog extends React.Component<StoreProps, Item> {
  state = {
    name: '',
    info: '',
    id: '',
    checked: false
  };

  confirm = (): void => {
    const {
      itemMenagerClient: {
        editItem,
        activeItem: { list, index }
      },
      visibilityClient: { toggleShowEditDialog }
    } = this.props.store;

    const newItem = this.state;

    if (list === 'items' || list === 'selected') {
      if (newItem.name === '' && newItem.info !== '') {
        newItem.name = this.props.store[list][index].name;
      } else if (newItem.name !== '' && newItem.info === '') {
        newItem.info = this.props.store[list][index].info;
      }
    }
    newItem.id = String(Date.now());

    editItem(newItem, list as ListType, index);
    toggleShowEditDialog();
    this.setState({
      name: '',
      info: '',
      id: '',
      checked: false
    });
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
          info: event ? target.value : this.props.store.items[index].info
        });
      }
    } else if (list === 'selected' && this.props.store.selected[index]) {
      if (target.name === 'name') {
        this.setState({
          name: event ? target.value : this.props.store.selected[index].name
        });
      } else {
        this.setState({
          info: event ? target.value : this.props.store.selected[index].info
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
      } else if (list === 'selected') {
        defaultName = this.props.store.selected[index].name;
        defaultInfo = this.props.store.selected[index].info;
      }
    }

    console.log(defaultName);
    console.log(defaultInfo);

    return (
      <Dialog open={showEditDialog}>
        <DialogTitle>Edit product</DialogTitle>
        <TextField
          id='outlined-required'
          label='Type new name'
          defaultValue={defaultName}
          name='name'
          onChange={this.changeNewItem}
        />
        <TextField
          id='outlined'
          label='Type new info'
          defaultValue={defaultInfo}
          name='info'
          onChange={this.changeNewItem}
        />
        <DialogActions>
          <Button
            color='primary'
            onClick={() => toggleShowEditDialog(list as ListType, index)}
          >
            Cancel
          </Button>
          <Button color='primary' onClick={this.confirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
