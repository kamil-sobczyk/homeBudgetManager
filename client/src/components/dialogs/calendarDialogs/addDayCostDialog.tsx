import * as React from 'react';

import { observer } from 'mobx-react';

import { CategoryType } from '../../../lib/interfaces';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';

export const selectValues = [
  'Shopping',
  'Bill',
  'Car exploitation',
  'Health care',
  'Other'
];

interface AddDayCostDialogProps {
  addNewSpending: () => void;
  changeNewSpendingCategory: (e: React.FormEvent) => void;
  changeNewSpendingCounter: (event: React.FormEvent<EventTarget>) => void;
  changeNewSpendingInfo: (event: React.FormEvent<EventTarget>) => void;
  changeShoppingItems: (event: React.FormEvent<EventTarget>) => void;
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  count: number;
  category: CategoryType;
}

@observer
export class AddDayCostDialog extends React.Component<
  AddDayCostDialogProps,
  {}
> {
  confirm = () => {
    const { addNewSpending, setVisibleDialog } = this.props;

    addNewSpending();
    setVisibleDialog('CalendarDialog');
  };
  render() {
    const {
      changeNewSpendingCategory,
      changeNewSpendingCounter,
      changeNewSpendingInfo,
      changeShoppingItems,
      setVisibleDialog,
      visibleDialog,
      category
    } = this.props;

    return (
      <Dialog open={visibleDialog.includes('AddDayCostDialog')}>
        <StyledDialogTitle>Add cost</StyledDialogTitle>
        <Select
          label='Category'
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
        {category === 'shopping' && (
          <TextField
            label={`You bought (use commas)`}
            onChange={e => changeShoppingItems(e)}
            type='text'
            required
          />
        )}
        {category !== 'shopping' && (
          <TextField
            label='Short info'
            onChange={e => changeNewSpendingInfo(e)}
            type='text'
          />
        )}
        <DialogActions>
          <Button
            color='primary'
            onClick={() => setVisibleDialog('CalendarDialogDay')}
          >
            Cancel
          </Button>
          <Button color='primary' onClick={this.confirm}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
