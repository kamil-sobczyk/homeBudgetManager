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
import { getDateNow } from '../spendingsDialogs/spendingsTable/costsCounter';

interface CalendarDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  showFailSnackbar: boolean;
  toggleShowFailSnackbar: () => boolean;
  datePicked: string | Date;
  setDatePicked: (date: Date) => string;
  getCosts: () => void;
  costs: Cost[];
}

@observer
export class CalendarDialog extends React.Component<CalendarDialogProps, {}> {
  componentDidMount = () => {
    this.props.getCosts();
  };

  handleClickMore = () => {
    const { datePicked, toggleShowFailSnackbar, setVisibleDialog } = this.props;
    if (datePicked === '') {
      toggleShowFailSnackbar();
    } else {
      setVisibleDialog('CalendarDialogDay');
    }
  };

  render() {
    const {
      setVisibleDialog,
      visibleDialog,
      showFailSnackbar,
      setDatePicked,
      datePicked,
      costs
    } = this.props;

    console.log(JSON.stringify(costs));

    let daysWithExpenses = costs
      .filter(cost => cost.date.slice(3, 5) === getDateNow().slice(3, 5))
      .map(cost => parseInt(cost.date.slice(0, 2)));

    daysWithExpenses = daysWithExpenses.filter(
      (day, i) => daysWithExpenses.indexOf(day) === i
    );

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
              tileContent={({ date, view }) =>
                view === 'month' &&
                daysWithExpenses.indexOf(date.getDate()) > -1 ? (
                  <StyledBadge />
                ) : null
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
