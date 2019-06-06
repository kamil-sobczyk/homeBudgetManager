import * as React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { StyledDialogTitle } from '../spendingsDialogs/spendingsDialog';
import { Item, Cost, CategoryType } from '../../../lib/interfaces';
import { selectValues } from '../calendarDialogs/addDayCostDialog';
import { Select } from '@rmwc/select';

interface EditCostDialogProps {
  changeNewSpendingCategory: (e: React.FormEvent) => void;
  changeNewSpendingCounter: (event: React.FormEvent<EventTarget>) => void;
  changeNewSpendingInfo: (event: React.FormEvent<EventTarget>) => void;
  changeShoppingItems: (event: React.FormEvent<EventTarget>) => void;
  setVisibleDialog: (dialog?: string) => void;
  editCost: (cost: Cost) => void;
  prevVisibleDialog: string;
  visibleDialog: string;
  category: CategoryType;
  cost: Cost;
}

@observer
export class EditCostDialog extends React.Component<EditCostDialogProps, {}> {
    setDefaultBoughtItems = (items: string[]) => {
        const categories: string[] = [ 'shopping' , 'bill' , 'health' , 'car']
       if (categories.indexOf(items[0]) < 0) {
           return items
       } else return []
    }

  confirm = () => {
    // const { addNewSpending, setVisibleDialog } = this.props;
  };
  render() {
    const {
      setVisibleDialog,
      visibleDialog,
      changeNewSpendingCategory,
      changeNewSpendingCounter,
      changeNewSpendingInfo,
      changeShoppingItems,
      prevVisibleDialog,
      editCost,
      category,
      cost
    } = this.props;

    return (
      <Dialog open={visibleDialog.includes('EditCostDialog')}>
        <StyledDialogTitle>Edit cost</StyledDialogTitle>
        <Select
          label='Category'
          defaultValue={String(cost.category)}
          onChange={e => changeNewSpendingCategory(e)}
          options={selectValues}
          required
        />
        <TextField
          label='Cost'
          defaultValue={String(cost.count)}
          onChange={e => changeNewSpendingCounter(e)}
          type='number'
          required
        />
        {category === 'shopping' && (
          <TextField
            label={`You bought (use commas)`}
            defaultValue={this.setDefaultBoughtItems(cost.chosenItems)}
            onChange={e => changeShoppingItems(e)}
            type='text'
            required
          />
        )}
        {category !== 'shopping' && (
          <TextField
            label='Short info'
            defaultValue={cost.info ? cost.info : ''}
            onChange={e => changeNewSpendingInfo(e)}
            type='text'
          />
        )}
        <DialogActions>
          <Button color='primary' onClick={() => setVisibleDialog(prevVisibleDialog)}>
            Cancel
          </Button>
          <Button color='primary' onClick={() => editCost(cost)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
