import * as React from 'react';

import { observer } from 'mobx-react';

import Calendar from 'react-calendar';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from '../spendingsDialogs/spendingsDialog';
import { FailSnackbar } from './snackbar';

interface CallendarDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  showFailSnackbar: boolean;
  toggleShowFailSnackbar: () => boolean;
  datePicked: string | Date;
  setDatePicked: (date: Date) => string;
}

@observer
export class CallendarDialog extends React.Component<CallendarDialogProps, {}> {
  handleClickMore = () => {
    const { datePicked, toggleShowFailSnackbar } = this.props;
    if (datePicked === '') {
      toggleShowFailSnackbar();
    } else {
      console.log('succ')
    }
  };

  render() {
    const {
      setVisibleDialog,
      visibleDialog,
      showFailSnackbar,
      setDatePicked
    } = this.props;
    return (
      <>
        <Dialog
          open={visibleDialog === 'CallendarDialog'}
          aria-labelledby='CallendarDialog'
          aria-describedby='CallendarDialog'
        >
          <StyledDialogTitle>Callendar</StyledDialogTitle>
          <DialogContent>
            <Calendar
              // value={new Date()}
              onClickDay={(value: Date) => setDatePicked(value)}
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
      </>
    );
  }
}
