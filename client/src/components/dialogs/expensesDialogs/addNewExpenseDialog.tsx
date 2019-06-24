import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import { StyledDialogTitle } from './spendingsDialog';

const selectValues = ['Bill', 'Car exploitation', 'Health care', 'Other'];

interface AddNewExpenseDialogProps {
  addNewSpending: () => void;
  changeNewSpendingCategory: (e: React.FormEvent) => void;
  changeNewSpendingCounter: (event: React.FormEvent<EventTarget>) => void;
  changeNewSpendingInfo: (a: any) => any;
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  count: number;
}

export const AddNewExpenseDialog = observer(
  ({
    addNewSpending,
    changeNewSpendingCategory,
    changeNewSpendingCounter,
    changeNewSpendingInfo,
    setVisibleDialog,
    visibleDialog
  }: AddNewExpenseDialogProps) => {
    return (
      <Dialog open={visibleDialog === 'AddNewExpenseDialog'}>
        <StyledDialogTitle>Add other</StyledDialogTitle>
        <Select
          label='Spending type'
          onChange={e => changeNewSpendingCategory(e)}
          options={selectValues}
          required
        />
        <TextField
          label='Cost'
          defaultValue={''}
          onChange={e => changeNewSpendingCounter(e)}
          type='number'
          required
        />
        <TextField
          label='Short info'
          onChange={e => changeNewSpendingInfo(e)}
          type='text'
        />
        <DialogActions>
          <Button color='primary' onClick={() => setVisibleDialog()}>
            Cancel
          </Button>
          <Button color='primary' onClick={addNewSpending}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);
