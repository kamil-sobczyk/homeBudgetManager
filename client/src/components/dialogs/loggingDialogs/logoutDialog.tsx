import * as React from 'react';

import { observer } from 'mobx-react';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from '../spendingsDialogs/spendingsDialog';

interface LogoutDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
}

export const LogoutDialog = observer(
  ({ setVisibleDialog, visibleDialog }: LogoutDialogProps) => {
    const logout = (): void => {
      localStorage.clear();
      setVisibleDialog('LoginDialog');
    };

    return (
      <Dialog
        open={visibleDialog === 'LogoutDialog'}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <StyledDialogTitle>Logout</StyledDialogTitle>
        <DialogContent>Are you sure want to loguot?</DialogContent>
        <DialogActions>
          <Button onClick={() => setVisibleDialog()} color='primary'>
            No
          </Button>
          <Button onClick={() => logout()} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);
