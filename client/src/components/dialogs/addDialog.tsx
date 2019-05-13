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

@observer
export class AddDialog extends React.Component<StoreProps, Item> {
  state = {
    checked: false,
    id: String(Date.now()),
    info: '',
    name: ''
  };
  handleAddItem = () => {
    const {
      itemMenagerClient: { addItem },
      items,
      selected,
      visibilityClient: { toggleShowAddDialog, toggleShowFailDialog }
    } = this.props.store;
    const { name } = this.state;

    const allNames = [...selected, ...items].map(({ name }) => name);

    const finishAdding = (): void => {
      addItem(this.state);
      this.setState({
        checked: false,
        id: String(Date.now()),
        info: '',
        name: ''
      });
      toggleShowAddDialog();
    };

    allNames.indexOf(name) < 0 && name !== ''
      ? finishAdding()
      : toggleShowFailDialog();
  };

  changeNewItem = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;

    if (target.name === 'info') {
      this.setState({
        checked: false,
        id: String(Date.now()),
        info: target.value,
        name: this.state.name
      });
      return;
    }
    this.setState({
        checked: false,
        id: String(Date.now()),
        info: this.state.info,
        name: target.value
    });
  };

  render() {
    const {
      showAddDialog,
      toggleShowAddDialog
    } = this.props.store.visibilityClient;
    const {name, info} = this.state;
    return (
      <Dialog open={showAddDialog}>
        <DialogTitle>Add a new product</DialogTitle>
        <TextField
          defaultValue={name}
          id='outlined-required'
          label='New item'
          name='name'
          onChange={this.changeNewItem}
        />
        <TextField
          defaultValue={info}
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
        <FailDialog {...this.props} />
      </Dialog>
    );
  }
}
