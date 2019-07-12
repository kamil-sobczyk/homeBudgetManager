import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';

export const selectValues = [
  'Salary',
  'Gift',
  'Tax return',
  'Social benefit',
  'Other'
];

interface AddNewIncomeDialogProps {
  addNewIncome: () => void;
  changeNewIncomeCategory: (event: React.FormEvent) => void;
  changeNewIncomeCounter: (event: React.FormEvent<EventTarget>) => void;
  changeNewIncomeInfo: (event: React.FormEvent<EventTarget>) => void;
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
}

@observer
export class AddNewIncomeDialog extends React.Component<
  AddNewIncomeDialogProps,
  {}
> {
  render() {
    const {
      changeNewIncomeCategory,
      changeNewIncomeCounter,
      changeNewIncomeInfo,
      setVisibleDialog,
      visibleDialog,
      addNewIncome
    } = this.props;

    return (
      <Dialog open={visibleDialog.includes('AddNewIncomeDialog')}>
        <StyledDialogTitle>Add new income</StyledDialogTitle>
        <Select
          label='Category'
          onChange={e => changeNewIncomeCategory(e)}
          options={selectValues}
          required
        />
        <TextField
          label='Cost'
          defaultValue={''}
          onChange={e => changeNewIncomeCounter(e)}
          type='number'
          required
        />
        <TextField
          label='Short info'
          onChange={e => changeNewIncomeInfo(e)}
          type='text'
        />

        <DialogActions>
          <Button
            color='primary'
            onClick={() => setVisibleDialog('IncomesDialog')}
          >
            Cancel
          </Button>
          <Button color='primary' onClick={() => addNewIncome()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
