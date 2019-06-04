import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import { StyledDialogTitle } from '../spendingsDialogs/spendingsDialog';

const selectValues = ['Bill', 'Car exploatation', 'Health care'];

interface AddDayCostDialogProps {
  addNewSpending: () => void;
  changeNewSpendingName: (e: React.FormEvent) => void;
  changeNewSpendingCounter: (event: React.FormEvent<EventTarget>) => void;
  changeNewSpendingInfo: (a: any) => any
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  count: number;
}

export const AddDayCostDialog = observer(
  ({
    addNewSpending,
    changeNewSpendingName,
    changeNewSpendingCounter,
    changeNewSpendingInfo,
    setVisibleDialog,
    visibleDialog
  }: AddDayCostDialogProps) => {
    return (
      <Dialog open={visibleDialog === 'AddOtherDialog'}>
        <StyledDialogTitle>Add other</StyledDialogTitle>
        <Select
          label='Spending type'
          onChange={e => changeNewSpendingName(e)}
          options={selectValues}
          required
        />
        <TextField
          label='Cost'
          defaultValue={String(0)}
          onChange={e => changeNewSpendingCounter(e)}
          type='number'
          required
        />
        <TextField
        label='Short info'
        // defaultValue={String(0)}
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

