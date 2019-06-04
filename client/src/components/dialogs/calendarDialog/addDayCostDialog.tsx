import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import { StyledDialogTitle } from '../spendingsDialogs/spendingsDialog';
import { observable } from 'mobx';
import { CategoryType } from '../../../lib/interfaces';

const selectValues = ['Shopping', 'Bill', 'Car exploatation', 'Health care'];

interface AddDayCostDialogProps {
  addNewSpending: () => void;
  changeNewSpendingName: (e: React.FormEvent) => void;
  changeNewSpendingCounter: (event: React.FormEvent<EventTarget>) => void;
  changeNewSpendingInfo: (a: any) => any;
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
  render() {
    const {
      addNewSpending,
      changeNewSpendingName,
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
        {category === 'shopping' && (
          <TextField
            label={`You bought (use commas)`}
            onChange={e => changeShoppingItems(e)}
            type='text'
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
          <Button color='primary' onClick={() => setVisibleDialog('CalendarDialogDay')}>
            Cancel
          </Button>
          <Button color='primary' onClick={addNewSpending}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
