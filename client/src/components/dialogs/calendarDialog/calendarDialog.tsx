import * as React from 'react';

import { Cost } from '../../../lib/interfaces';

import { observer } from 'mobx-react';

import Calendar from 'react-calendar';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from '../spendingsDialogs/spendingsDialog';
import { FailSnackbar } from './snackbar';
import { CalendarDialogDay } from './calendarDialogDay';

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
      getCosts,
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
            <Calendar onClickDay={(value: Date) => setDatePicked(value)} />
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
            setDatePicked={setDatePicked}
            getCosts={getCosts}
            costs={costs}
          />
        )}
      </>
    );
  }
}


// console.log(new Date('04.06.2019, 09:36'));

let dateString = "'04.06.2019, 09:36'";
// dateString = dateString.substr(3, 2)+"/"+dateString.substr(0, 2)+"."+dateString.substr(6, 4);
dateString = dateString.substr(6, 4)+"."+dateString.substr(3, 2)+"."+dateString.substr(0, 2);
const date = new Date(dateString);

console.log(date);