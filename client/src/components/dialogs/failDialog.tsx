import * as React from 'react';

import { observer } from 'mobx-react';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';

interface FailDialogProps {
  setVisibleDialog: (dialog?: string) => string;
  visibleDialog: string;
}

export const FailDialog = observer(
  ({ setVisibleDialog, visibleDialog }: FailDialogProps) => (
    <Dialog
      open={visibleDialog === 'FailDialog'}
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
        <Button onClick={() => setVisibleDialog()} color='primary' autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
);
