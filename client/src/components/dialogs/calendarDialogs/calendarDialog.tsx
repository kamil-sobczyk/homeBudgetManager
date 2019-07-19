import * as React from 'react';

import styled from 'styled-components';

import { Cost } from '../../../lib/interfaces';

import { observer } from 'mobx-react';

import Calendar from 'react-calendar';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';
import { FailSnackbar } from './snackbar';
import { CalendarDialogDay } from './calendarDialogDay';
import { observable } from 'mobx';
import { getDateNow } from '../expensesDialogs/spendingsTable/costsCounter';

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
}

@observer
export class CalendarDialog extends React.Component<CalendarDialogProps, {}> {
  @observable daysVisible: string[] = [];

  componentDidMount = () => {
    const { getCosts, getCalendarViewDate } = this.props;

    getCosts();
    getCalendarViewDate(new Date());
    // console.log(getCalendarViewDate(new Date()))
  };

  handleClickMore = () => {
    const { datePicked, toggleShowFailSnackbar, setVisibleDialog } = this.props;
    if (datePicked === '') {
      toggleShowFailSnackbar();
    } else {
      setVisibleDialog('CalendarDialogDay');
    }
  };

  countTileStyle = (date: Date, view: string) => {
    const { calendarViewDate, getCalendarViewDate } = this.props;

    // console.log("countDaysWithExp",this.countDaysWithExpenses());
    // console.log("date.getDate",date.getDate());
    // console.log('calendarViewDate',calendarViewDate[4])
    // console.log('getCalendarViewDate(date)',getCalendarViewDate(date)[4])

    if (view === 'month') {
      if (
        // this.countDaysWithExpenses().indexOf(date.getDate()) > -1 
        // &&
        calendarViewDate.slice(3, 4) === getCalendarViewDate(date).slice(3, 4)
      ) {
        return 'cost';
      } else return 'income';
    } else return null;
  };

  countDaysWithExpenses = () => {
    const { calendarViewDate, costs } = this.props;

    let daysWithExpenses: number[] = costs
      .filter(cost => cost.date.slice(3, 5) === calendarViewDate.slice(3, 5))
      .map(cost => parseInt(cost.date.slice(0, 2)));

      // console.log(daysWithExpenses)

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
          open={visibleDialog.includes('Calendar')}
          aria-labelledby='CalendarDialog'
          aria-describedby='CalendarDialog'
        >
          <StyledDialogTitle>Calendar</StyledDialogTitle>
          <DialogContent>
            <StyledCalendar
              onClickDay={(value: Date) => setDatePicked(value)}
              onActiveDateChange={({ activeStartDate }) =>{
                console.log(activeStartDate)
                getCalendarViewDate(activeStartDate)
              }
            
              }
              tileClassName={({ date, view }): any =>{
                // console.log(date)
                this.countTileStyle(date, view)
              }
         
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
        <FailSnackbar showSnackbar={showFailSnackbar} />
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
    background-color: rgba(220, 220, 220, 0.5);
    border-radius: 20%;
  }
  ${'.income'} {
    background-color: rgba(124, 252, 0, 0.5);
    border-radius: 20%;
  }
`;
