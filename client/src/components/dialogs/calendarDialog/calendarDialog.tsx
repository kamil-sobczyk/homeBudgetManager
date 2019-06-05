import * as React from 'react';

import styled from 'styled-components';

import { Cost } from '../../../lib/interfaces';

import { observer } from 'mobx-react';

import Calendar from 'react-calendar';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from '../spendingsDialogs/spendingsDialog';
import { FailSnackbar } from './snackbar';
import { CalendarDialogDay } from './calendarDialogDay';
import { observable } from 'mobx';

interface CalendarDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  showFailSnackbar: boolean;
  toggleShowFailSnackbar: () => boolean;
  datePicked: string | Date;
  setDatePicked: (date: Date) => string;
  getCalendarViewDate: (activeStartDate: Date) => string;
  calendarViewDate: string;
  getCosts: () => void;
  costs: Cost[];
}

@observer
export class CalendarDialog extends React.Component<CalendarDialogProps, {}> {
  @observable daysVisible: string[] = [];

  componentDidMount = () => {
    const { getCosts, getCalendarViewDate } = this.props;

    getCosts();
    getCalendarViewDate(new Date());
  };

  handleClickMore = () => {
    const { datePicked, toggleShowFailSnackbar, setVisibleDialog } = this.props;
    if (datePicked === '') {
      toggleShowFailSnackbar();
    } else {
      setVisibleDialog('CalendarDialogDay');
    }
  };

  countBadges = (date: Date, view: string) => {
    const { calendarViewDate, getCalendarViewDate, costs } = this.props;

    if (view === 'month') {
      if (
        this.countDaysWithExpenses().indexOf(date.getDate()) > -1 &&
        calendarViewDate[4] === getCalendarViewDate(date)[4]
      ) {
        return <StyledBadge />;
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
      costs
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
            <Calendar
              onClickDay={(value: Date) => setDatePicked(value)}
              onActiveDateChange={({ activeStartDate }) =>
                getCalendarViewDate(activeStartDate)
              }
              tileContent={({ date, view }) => this.countBadges(date, view)}
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
          />
        )}
      </>
    );
  }
}

const StyledBadge = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background: blue;
`;
