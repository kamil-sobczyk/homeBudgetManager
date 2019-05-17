import * as React from 'react';

import { observer } from 'mobx-react';

import {
  Dialog,
  DialogActions,
  DialogContent,
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';
import { observable } from 'mobx';

interface FailDialogProps {
  toggleShowFailDialog: () => void;
  showFailDialog: boolean
} 

@observer
export class FailDialog extends React.Component<FailDialogProps, {}> {

  @observable showFail?: boolean = false;


  componentWillReceiveProps(props: FailDialogProps) {
    this.showFail = props.showFailDialog
  }
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
        <StyledDialogTitle id='alert-dialog-title'>
          Unable to perform this action!
        </StyledDialogTitle>
        <DialogContent id='alert-dialog-description'>
          This product is on your list already or it has no name.
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
