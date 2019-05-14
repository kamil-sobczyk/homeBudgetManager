import * as React from 'react';

import { observer } from 'mobx-react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';

interface FailDialogProps {
  toggleShowFailDialog: () => void;
  showFailDialog: boolean
} 

@observer
export class FailDialog extends React.Component<FailDialogProps, {}> {
  render() {
    const {
      showFailDialog,
      toggleShowFailDialog
    } = this.props
    return (
      <Dialog
        open={showFailDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Unable to add new product to the list!
        </DialogTitle>
        <DialogContent id='alert-dialog-description'>
          This product is on your list already.
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleShowFailDialog} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
