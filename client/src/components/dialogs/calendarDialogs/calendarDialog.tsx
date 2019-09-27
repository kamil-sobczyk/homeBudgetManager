import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';

import { Cost, Income } from '../../../lib/interfaces';

import Calendar from 'react-calendar';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';
import { FailSnackbar } from './snackbar';
import { CalendarDialogDay } from './calendarDialogDay';
import { observable } from 'mobx';

interface CalendarDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  toggleShowFailSnackbar: () => boolean;
  setDatePicked: (date: Date) => string;
  getCalendarViewDate: (activeStartDate: Date) => string;
  setChosenCost: (cost: Cost) => Cost;
  getCosts: () => void;
  visibleDialog: string;
  showFailSnackbar: boolean;
  datePicked: string | Date;
  calendarViewDate: string;
  costs: Cost[];
  getIncomes: () => void;
  incomes: Income[];
}

type TileClass = 'cost' | 'income' | 'cost-income' | null;

@observer
export class CalendarDialog extends React.Component<CalendarDialogProps> {
  componentDidMount = () => {
    const { getCosts, getIncomes, getCalendarViewDate } = this.props;

    getCosts();
    getIncomes();
    getCalendarViewDate(new Date());
  };

  private handleClickMore = () => {
    const { datePicked, toggleShowFailSnackbar, setVisibleDialog } = this.props;
    if (datePicked === '') {
      toggleShowFailSnackbar();
    } else {
      setVisibleDialog('CalendarDialogDay');
    }
  };

  private countTileStyle = (date: Date, view: string) => {
    const { calendarViewDate } = this.props;

    const checkDay = (type: string): boolean =>
      (type === 'cost'
        ? this.countDaysWithExpenses()
        : this.countDaysWithIncomes()
      ).indexOf(date.getDate()) > -1 &&
      String(date.toLocaleString('en-GB')).slice(3, 5) ===
        calendarViewDate.slice(3, 5);

    const isCost: boolean = checkDay('cost');
    const isIncome: boolean = checkDay('income');
    const isCostAndIncome: boolean = isCost && isIncome;

    if (view === 'month') {
      if (isCostAndIncome) {
        return 'cost-income';
      }
      if (isCost) {
        return 'cost';
      }
      if (isIncome) {
        return 'income';
      } else return null;
    } else return null;
  };

  private countDaysWithExpenses = () => {
    const { calendarViewDate, costs } = this.props;

    let daysWithExpenses: number[] = costs
      .filter(
        (cost: Cost) => cost.date.slice(3, 5) === calendarViewDate.slice(3, 5)
      )
      .map((cost: Cost) => parseInt(cost.date.slice(0, 2)));

    return daysWithExpenses.filter(
      (day: number, index: number) => daysWithExpenses.indexOf(day) === index
    );
  };

  private countDaysWithIncomes = () => {
    const { calendarViewDate, incomes } = this.props;

    let daysWithIncomes: number[] = incomes
      .filter(
        (income: Income) =>
          income.date.slice(3, 5) === calendarViewDate.slice(3, 5)
      )
      .map((income: Income) => parseInt(income.date.slice(0, 2)));

    return daysWithIncomes.filter(
      (day: number, index: number) => daysWithIncomes.indexOf(day) === index
    );
  };

  render() {
    const {
      setVisibleDialog,
      visibleDialog,
      showFailSnackbar,
      setDatePicked,
      datePicked,
      getCalendarViewDate,
      costs,
      setChosenCost
    } = this.props;

    return (
      <>
        <Dialog
          open={visibleDialog.includes('Calendar')}
          aria-labelledby='CalendarDialog'
          aria-describedby='CalendarDialog'
        >
          <StyledDialogTitle>Calendar</StyledDialogTitle>
          <DialogContent>
            <StyledCalendar
              onClickDay={(value: Date): string => setDatePicked(value)}
              onActiveDateChange={({ activeStartDate }) =>
                getCalendarViewDate(activeStartDate)
              }
              tileClassName={({ date, view }): TileClass =>
                this.countTileStyle(date, view)
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickMore} color='primary'>
              More
            </Button>
            <Button
              onClick={() => setVisibleDialog()}
              color='primary'
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <FailSnackbar
          showSnackbar={showFailSnackbar}
          text='Pick a date first'
        />
        {visibleDialog.includes('Day') && (
          <CalendarDialogDay
            setVisibleDialog={setVisibleDialog}
            visibleDialog={visibleDialog}
            showFailSnackbar={showFailSnackbar}
            datePicked={datePicked}
            costs={costs}
            setChosenCost={setChosenCost}
          />
        )}
      </>
    );
  }
}

export const StyledCalendar = styled(Calendar)`
  ${'.cost'} {
    background-color: rgba(110, 110, 110, 0.2);
    border-radius: 20%;
  }
  ${'.income'} {
    background-color: rgba(124, 252, 0, 0.2);
    border-radius: 20%;
  }
  ${'.cost-income'} {
    background: linear-gradient(
      153deg,
      rgba(169, 169, 169, 0.4) 35%,
      rgba(124, 252, 0, 0.4) 65%
    );
    border-radius: 20%;
  }
`;
