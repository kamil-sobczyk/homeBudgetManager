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
}

@observer
export class CallendarDialog extends React.Component<CallendarDialogProps, {}> {
  state = {
    datePicked: '',
    showSnackbar: false
  };

  setDatePicked = (value: Date) => {
    this.setState({
      datePicked: value.toLocaleDateString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit'
      })
    });

    console.log(this.state)
  };

  handleClickMore = () => {
    if (this.state.datePicked === '') {
      console.log('fail')
      this.setState({showSnackbar: true})
    }
  }

  render() {
    const { setVisibleDialog, visibleDialog } = this.props;
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
            value={new Date()}
            onClickDay={(value: Date) => this.setDatePicked(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClickMore} color='primary'>
            More
          </Button>
          <Button onClick={() => setVisibleDialog()} color='primary' autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <FailSnackbar showSnackbar={this.state.showSnackbar}/>
      </>
    );
  }
}
