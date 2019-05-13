import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { Item } from '../../lib/interfaces';

import { FailDialog } from './failDialog';

// const resetAddFields = () => {
//   const nameInput = document.getElementById("outlined-required");
//   const infoInput = document.getElementById("outlined");

//   if (nameInput !== null) {
//     nameInput.value = "";
//   } else nameInput.value = null;

//   if (infoInput !== null) {
//     infoInput.value = "";
//   } else infoInput.value = null;
// };

interface AddDialogState {
  item: Item;
  openFail: boolean;
}

@observer
export class AddDialog extends React.Component<StoreProps, AddDialogState> {
  state = {
    item: {
      checked: false,
      id: String(Date.now()),
      info: '',
      name: ''
    },
    openFail: false
  };
  handleAddItem = () => {
    const {
      itemMenagerClient: { addItem },
      items,
      selected,
      visibilityClient: { toggleShowAddDialog }
    } = this.props.store;
    const { name } = this.state.item;

    const allNames = [...selected, ...items].map(({ name }) => name);

    const finishAdding = (): void => {
      const { item } = this.state;

      addItem(item);
      this.setState({
        item: {
          checked: false,
          id: String(Date.now()),
          info: '',
          name: ''
        }
      });
      toggleShowAddDialog();
    };

    allNames.indexOf(name) < 0 && name !== ''
      ? finishAdding()
      : this.setState({ openFail: true });
  };

  toggleOpenFailDialog = (): void => {
    this.setState({ openFail: !this.state.openFail });
  };

  changeNewItem = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    const { item } = this.state;

    if (target.name === 'info') {
      this.setState({
        item: {
          checked: false,
          id: String(Date.now()),
          info: target.value,
          name: item.name
        }
      });
      return;
    }
    this.setState({
      item: {
        checked: false,
        id: String(Date.now()),
        info: item.info,
        name: target.value
      }
    });
  };

  render() {
    const {
      showAddDialog,
      toggleShowAddDialog
    } = this.props.store.visibilityClient;
    return (
      <Dialog open={showAddDialog}>
        <DialogTitle>Add a new product</DialogTitle>
        <TextField
          defaultValue={this.state.item.name}
          id='outlined-required'
          label='New item'
          name='name'
          onChange={this.changeNewItem}
        />
        <TextField
          defaultValue={this.state.item.info}
          id='outlined'
          label='Additional info'
          name='info'
          onChange={this.changeNewItem}
        />
        <DialogActions>
          <Button color='primary' onClick={toggleShowAddDialog}>
            Cancel
          </Button>
          <Button color='primary' onClick={this.handleAddItem}>
            Add
          </Button>
        </DialogActions>
        <FailDialog
          {...this.props}
          //   open={this.state.openFail}
          //   onClose={()=>this.toggleOpenFailDialog}
        />
      </Dialog>
    );
  }
}
