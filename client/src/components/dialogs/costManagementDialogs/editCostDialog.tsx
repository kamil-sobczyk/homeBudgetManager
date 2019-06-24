import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';
import { Cost, CategoryType } from '../../../lib/interfaces';
import { selectValues } from '../calendarDialogs/addDayCostDialog';
import { observable } from 'mobx';
import Calendar from 'react-calendar';

interface EditCostDialogProps {
  changeNewSpendingCategory: (e: React.FormEvent) => void;
  changeNewSpendingCounter: (event: React.FormEvent<EventTarget>) => void;
  changeNewSpendingInfo: (event: React.FormEvent<EventTarget>) => void;
  changeShoppingItems: (event: React.FormEvent<EventTarget>) => void;
  setDatePicked: (date: Date) => string;
  getCalendarViewDate: (activeStartDate: Date) => string;
  setVisibleDialog: (dialog?: string) => void;
  editCost: (oldCost: Cost) => void;
  datePicked: string | Date;
  prevVisibleDialog: string;
  visibleDialog: string;
  category: CategoryType;
  cost: Cost;
  count: number;
}

@observer
export class EditCostDialog extends React.Component<EditCostDialogProps, {}> {
  @observable showCalendar: boolean = false;
  @observable date: string = '';
  @observable modifyingCost: boolean = false;

  getDate = () => {
    let dayString: string = String(this.props.datePicked).replace(/\./g, '/');

    if (dayString[1] === '/') {
      dayString = `0${dayString}`;
    }

    if (dayString[4] === '/') {
      dayString = `${dayString.slice(0, 3)}0${dayString.slice(3)}`;
    }
    return dayString.slice(0, 10);
  };

  getDefaultItems = (items: string[]): [] | string[] => {
    const categories: string[] = ['shopping', 'bill', 'health', 'car'];
    if (categories.indexOf(items[0]) < 0) {
      return items;
    } else return [];
  };

  handleCalendarDayClick = (value: Date): void => {
    const { setDatePicked, datePicked } = this.props;

    this.modifyingCost = true;
    setDatePicked(value);

    this.date = String(datePicked);
    this.showCalendar = false;
  };

  handleActionClick = (action: string): void => {
    const { setVisibleDialog, prevVisibleDialog, editCost, cost } = this.props;

    if (action === 'cancel') {
      this.modifyingCost = false;
    } else {
      editCost(cost);
      this.modifyingCost = false;
    }
    setVisibleDialog();
  };

  onChangeCost = (event: React.FormEvent<EventTarget>): void => {
    this.modifyingCost = true;
    this.props.changeNewSpendingCounter(event);
  };

  onChangeCategory = (event: React.FormEvent<Element>): void => {
    this.modifyingCost = true;
    this.props.changeNewSpendingCategory(event);
  };

  render() {
    const {
      visibleDialog,
      changeNewSpendingCategory,
      changeNewSpendingInfo,
      changeShoppingItems,
      getCalendarViewDate,
      datePicked,
      category,
      cost,
      count
    } = this.props;

    return (
      <Dialog open={visibleDialog.includes('EditCostDialog')}>
        <StyledDialogTitle>Edit cost</StyledDialogTitle>
        {!this.showCalendar && (
          <>
            <Select
              label='Category'
              onChange={e => changeNewSpendingCategory(e)}
              options={selectValues}
              required
            />
            <TextField
              label='Cost'
              defaultValue={
                !this.modifyingCost ? String(cost.count) : String(count)
              }
              onChange={e => this.onChangeCost(e)}
              type='number'
              required
            />
          </>
        )}
        <TextField
          label={'Date'}
          value={String(
            String(datePicked).length && this.modifyingCost
              ? datePicked
              : cost.date
          )}
          onClick={() => (this.showCalendar = true)}
          onChange={e => changeShoppingItems(e)}
          type='text'
        />
        {this.showCalendar && (
          <Calendar
            onClickDay={(value: Date) => this.handleCalendarDayClick(value)}
            onActiveDateChange={({ activeStartDate }) =>
              getCalendarViewDate(activeStartDate)
            }
          />
        )}
        {!this.showCalendar && (
          <>
            {category === 'shopping' && (
              <TextField
                label={`You bought (use commas)`}
                defaultValue={this.getDefaultItems(cost.chosenItems)}
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
          </>
        )}
        <DialogActions>
          <Button
            color='primary'
            onClick={() => this.handleActionClick('cancel')}
          >
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={() => this.handleActionClick('confirm')}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
