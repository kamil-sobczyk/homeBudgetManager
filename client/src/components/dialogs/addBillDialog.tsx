import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { Item } from '../../lib/interfaces';

import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';

interface AddBillDialogProps {
  addBill: () => void;
  changeNewBill: (event: React.FormEvent<EventTarget>) => void;
  changeCounter: (event: React.FormEvent<EventTarget>) => void;
  setVisibleDialog: (dialog?: string) => string;
  visibleDialog: string;
  count: number;
}

@observer
export class AddBillDialog extends React.Component<AddBillDialogProps, Item> {
  render() {
    const {
      addBill,
      changeNewBill,
      changeCounter,
      setVisibleDialog,
      visibleDialog
    } = this.props;

    return (
      <Dialog open={visibleDialog === 'AddBillDialog'}>
        <StyledDialogTitle>Add new bill</StyledDialogTitle>
        <TextField
          defaultValue={''}
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
          <Button color='primary' onClick={() => setVisibleDialog()}>
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
