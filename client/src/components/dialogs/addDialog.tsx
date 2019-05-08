import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../listBox';

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
      name: '',
      info: '',
      id: String(Date.now()),
      checked: false
    },
    openFail: false
  };
  handleAddItem = () => {
    const { addItem, toggleShowAddDialog, items, selected } = this.props.store;

    const allNames = [...selected, ...items].map(({ name }) => name);

    const finishAdding = (): void => {
      const { item } = this.state;

      addItem(item);
      //   addNewItemOnServer(item);
      this.setState({
        item: {
          name: '',
          info: '',
          id: String(Date.now()),
          checked: false
        }
      });
      toggleShowAddDialog();
      //   resetAddFields();                        //////////////////////////////////
    };
    const { name } = this.state.item;

    allNames.indexOf(name) < 0 && name !== ''
      ? finishAdding()
      : this.setState({ openFail: true });
  };

  toggleOpenFailDialog = (): void => {
    this.setState({ openFail: !this.state.openFail });
  };

  changeNewItem = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    //////////////////
    const { item } = this.state;
    if (target.name === 'info') {
      this.setState({
        item: {
          info: target.value,
          id: String(Date.now()),
          name: item.name,
          checked: false
        }
      });
      return;
    }
    this.setState({
      item: {
        name: target.value,
        info: item.info,
        id: String(Date.now()),
        checked: false
      }
    });
  };

  render() {
    const { toggleShowAddDialog, showAddDialog } = this.props.store;
    return (
      <Dialog
        open={showAddDialog}
        // onClose={this.handleCloseAdd}
      >
        <DialogTitle>Add a new product</DialogTitle>
        <TextField
          id='outlined-required'
          label='New item'
          name='name'
          defaultValue={this.state.item.name}
          //   margin="normal"
          //   variant="outlined"
          onChange={this.changeNewItem}
        />
        <TextField
          id='outlined'
          label='Additional info'
          name='info'
          defaultValue={this.state.item.info}
          //   margin="normal"
          //   variant="outlined"
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
