import * as React from 'react';

import { Cost, Income } from '../../../lib/interfaces';

import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';
import { FailSnackbar } from '../calendarDialogs/snackbar';
import { StyledCalendar } from '../calendarDialogs/calendarDialog';

interface IncomesCallendarDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  toggleShowFailSnackbar: () => boolean;
  setDatePicked: (date?: Date) => string;
  getCalendarViewDate: (activeStartDate: Date) => string;
  setChosenCost: (cost: Cost) => Cost;
  incomes: Income[];
  visibleDialog: string;
  showFailSnackbar: boolean;
  datePicked: string | Date;
  calendarViewDate: string;
  costs: Cost[];
}

@observer
export class IncomesCallendarDialog extends React.Component<
  IncomesCallendarDialogProps,
  {}
> {
  @observable daysVisible: string[] = [];

  componentDidMount = () => {
    const { getCalendarViewDate, setDatePicked } = this.props;

    setDatePicked();
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

  render() {
    const {
      setVisibleDialog,
      visibleDialog,
      showFailSnackbar,
      setDatePicked,
      getCalendarViewDate
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickPickDate} color='primary'>
              Pick Date
            </Button>
            <Button
              onClick={() => setVisibleDialog('IncomesDialog')}
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
