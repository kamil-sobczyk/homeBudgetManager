import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { Item } from '../../lib/interfaces';

import { StyledDialogTitle } from './spendingsDialog';

interface AddBillDialogProps {
  toggleshowAddBillDialog: () => boolean;
  addBill: () => void;
  showAddBillDialog: boolean;
}

@observer
export class AddBillDialog extends React.Component<AddBillDialogProps, Item> {
  onItemChange = (e: React.FormEvent<any>) => {
    // this.props.changeNewItem(e);
  };

  render() {
    const {
      showAddBillDialog,
      toggleshowAddBillDialog,
      addBill
    } = this.props;

    return (
      <Dialog open={showAddBillDialog}>
        <StyledDialogTitle>Add a new product</StyledDialogTitle>
        <TextField
          defaultValue={''}
          id='outlined-required'
          label='New item'
          name='name'
          onChange={e => this.onItemChange(e)}
        />
        <TextField
          defaultValue={''}
          id='outlined'
          label='Additional info'
          name='info'
          // onChange={e => changeNewItem(e)}
        />
        <DialogActions>
          <Button color='primary' onClick={toggleshowAddBillDialog}>
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
