import * as React from 'react';

import styled from 'styled-components';

import { Cost } from '../../../lib/interfaces';

import { observer } from 'mobx-react';

import Calendar from 'react-calendar';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';
import { FailSnackbar } from '../calendarDialogs/snackbar';

import { observable } from 'mobx';

interface IncomesCallendarDialogProps{
  setVisibleDialog: (dialog?: string) => void;
  toggleShowFailSnackbar: () => boolean;
  setDatePicked: (date?: Date) => string;
  getCalendarViewDate: (activeStartDate: Date) => string;
  setChosenCost: (cost: Cost) => Cost;
  getCosts: () => void;
  visibleDialog: string;
  showFailSnackbar: boolean;
  datePicked: string | Date;
  calendarViewDate: string;
  costs: Cost[];
}

@observer
export class IncomesCallendarDialog extends React.Component<IncomesCallendarDialogProps, {}> {
  @observable daysVisible: string[] = [];

  componentDidMount = () => {
    const { getCosts, getCalendarViewDate, setDatePicked } = this.props;

    setDatePicked()
    getCalendarViewDate(new Date());
  };

  handleClickPickDate = () => {
    const { datePicked, toggleShowFailSnackbar, setVisibleDialog } = this.props;
    if (datePicked === '') {
      toggleShowFailSnackbar();
    } else {
      setVisibleDialog('AddNewIncomeDialog');
    }
  };

  countTileStyle = (date: Date, view: string) => {
    const { calendarViewDate, getCalendarViewDate } = this.props;

    if (view === 'month') {
      if (
        this.countDaysWithExpenses().indexOf(date.getDate()) > -1 &&
        calendarViewDate[4] === getCalendarViewDate(date)[4]
      ) {
        return 'active';
      } else return null;
    } else return null;
  };

  countDaysWithExpenses = () => {
    const { calendarViewDate, costs } = this.props;

    let daysWithExpenses: number[] = costs
      .filter(cost => cost.date.slice(3, 5) === calendarViewDate.slice(3, 5))
      .map(cost => parseInt(cost.date.slice(0, 2)));

    return daysWithExpenses.filter(
      (day, index) => daysWithExpenses.indexOf(day) === index
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
          open={visibleDialog.includes('IncomesCalendarDialog')}
          aria-labelledby='IncomesCalendar'
          aria-describedby='IncomesCalendar'
        >
          <StyledDialogTitle>Calendar</StyledDialogTitle>
          <DialogContent>
            <StyledCalendar
              onClickDay={(value: Date) => setDatePicked(value)}
              onActiveDateChange={({ activeStartDate }) =>
                getCalendarViewDate(activeStartDate)
              }
              tileClassName={({ date, view }) =>
                this.countTileStyle(date, view)
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickPickDate} color='primary'>
              Pick Date
            </Button>
            <Button
              onClick={() => setVisibleDialog("IncomesDialog")}
              color='primary'
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <FailSnackbar showSnackbar={showFailSnackbar} />
      </>
    );
  }
}

const StyledCalendar = styled(Calendar)`
  ${'.active'} {
    background-color: rgba(220, 220, 220, 0.5);
    border-radius: 20%;
  }
`;
