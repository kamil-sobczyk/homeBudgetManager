import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { Item } from '../../lib/interfaces';

import { StyledDialogTitle } from './spendingsDialog';

interface AddBillDialogProps {
  toggleShowAddBillDialog: () => boolean;
  addBill: () => void;
  changeNewBill: (event: React.FormEvent<EventTarget>) => void;
  showAddBillDialog: boolean;
}

@observer
export class AddBillDialog extends React.Component<AddBillDialogProps, Item> {
  render() {
    const {
      showAddBillDialog,
      toggleShowAddBillDialog,
      addBill,
      changeNewBill
    } = this.props;

    return (
      <Dialog open={showAddBillDialog}>
        <StyledDialogTitle>Add new bill</StyledDialogTitle>
        <TextField
          defaultValue={''}
          id='outlined-required'
          label='Bill'
          name='name'
          onChange={e => changeNewBill(e)}
        />
        <TextField
          defaultValue={''}
          id='outlined'
          label='Additional info'
          name='info'
          onChange={e => changeNewBill(e)}
        />
        <DialogActions>
          <Button color='primary' onClick={toggleShowAddBillDialog}>
            Cancel
          </Button>
          <Button color='primary' onClick={addBill}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
