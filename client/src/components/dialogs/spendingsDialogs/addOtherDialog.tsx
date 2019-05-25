import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import { StyledDialogTitle } from './spendingsDialog';

const selectValues = ['Bill', 'Car exploatation', 'Health care'];

interface AddOtherDialogProps {
  addNewSpending: () => void;
  changeNewSpendingName: (event: React.FormEvent<any>) => void;
  changeNewSpendingNameCounter: (event: React.FormEvent<EventTarget>) => void;
  setVisibleDialog: (dialog?: string) => string;
  visibleDialog: string;
  count: number;
}

export const AddOtherDialog = observer(
  ({
    addNewSpending,
    changeNewSpendingName,
    changeNewSpendingNameCounter,
    setVisibleDialog,
    visibleDialog,
  }: AddOtherDialogProps) => {
    return (
      <Dialog open={visibleDialog === 'AddOtherDialog'}>
        <StyledDialogTitle>Add other</StyledDialogTitle>
        <StyledSelect
          onChange={(e: React.FormEvent<any>) => changeNewSpendingName(e)}
          options={selectValues}
        />
        <TextField
          label='Cost'
          defaultValue={String(0)}
          onChange={e => changeNewSpendingNameCounter(e)}
          type='number'
          required
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

const StyledSelect = styled(Select)`
  /* height: 100px; */
`;
