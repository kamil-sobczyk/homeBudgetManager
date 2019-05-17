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
  changeCounter: (event: React.FormEvent<EventTarget>) => void;
  showAddBillDialog: boolean;
  count: number;
}

@observer
export class AddBillDialog extends React.Component<AddBillDialogProps, Item> {
  render() {
    const {
      showAddBillDialog,
      toggleShowAddBillDialog,
      addBill,
      changeNewBill,
      changeCounter
    } = this.props;

    return (
      <Dialog open={showAddBillDialog}>
        <StyledDialogTitle>Add new bill</StyledDialogTitle>
        <TextField
          defaultValue={''}
          id='outlined-required'
          label='Bill name'
          name='name'
          onChange={e => changeNewBill(e)}
        />
        <TextField
        label='Cost'
        defaultValue={String(0)}
        onChange={e => changeCounter(e)}
        type='number'
        required
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
