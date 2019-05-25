import * as React from 'react';

import Select from 'react-select';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { StyledDialogTitle } from './spendingsDialog';

import { CategoryType } from '../../../lib/interfaces';
import styled from 'styled-components';

export interface SelectValue {
  value: CategoryType;
  label: string;
}

const selectValues = [
  { value: 'bill', label: 'Bill' },
  { value: 'car', label: 'Car exploatation' },
  { value: 'health', label: 'Health care' }
];

interface AddOtherDialogProps {
  addNewSpending: () => void;
  changeNewSpendingName: (event: SelectValue) => void;
  changeNewSpendingNameCounter: (event: React.FormEvent<EventTarget>) => void;
  setVisibleDialog: (dialog?: string) => string;
  categoryName: SelectValue;
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
    categoryName
  }: AddOtherDialogProps) => {
    return (
      <Dialog open={visibleDialog === 'AddOtherDialog'}>
        <StyledDialogTitle>Add other</StyledDialogTitle>
        <StyledSelect
          value={categoryName}
          onChange={(selectValue: 
            SelectValue) => changeNewSpendingName(selectValue)}
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
  height: 100px;
`;
