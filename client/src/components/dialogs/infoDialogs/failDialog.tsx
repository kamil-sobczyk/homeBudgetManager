import * as React from 'react';

import { observer } from 'mobx-react';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';

interface FailDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
}

export const FailDialog = observer(
  ({ setVisibleDialog, visibleDialog }: FailDialogProps) => (
    <Dialog
      open={visibleDialog.includes('Fail')}
      aria-labelledby='FailDialog'
      aria-describedby='FailDialog'
    >
      <StyledDialogTitle>Unable to perform this action!</StyledDialogTitle>
      <DialogContent>
        This product is on your list already or it has no name.
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setVisibleDialog('AddShoppingItemDialog')}
          color='primary'
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
);
