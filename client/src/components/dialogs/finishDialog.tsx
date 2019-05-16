import * as React from 'react';

import { observer } from 'mobx-react';
import { Cost } from '../../lib/interfaces';
import { Item } from '../../lib/interfaces';

import {
  Dialog,
  DialogActions,
  DialogContent,
} from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';

import {StyledDialogTitle} from './shoppingDialog';

interface FinishDialogProps {
  toggleShowFinishDialog: (cost?: Cost) => void;
  changeCounter: (event: React.FormEvent<EventTarget>) => void;
  finishShopping: () => void;
  reorderItems: (newItems: Item[], newSelected: Item[]) => void;
  items: Item[];
  selected: Item[];
  showFinish: boolean;
  showAddDialog: boolean;
}

@observer
export class FinishDialog extends React.Component<FinishDialogProps, Cost> {
  render() {
    const { showFinish, toggleShowFinishDialog, changeCounter, finishShopping } = this.props;

    return (
      <Dialog
        aria-describedby='alert-dialog-description'
        aria-labelledby='alert-dialog-title'
        open={showFinish}
      >
        <StyledDialogTitle id='alert-dialog-title'>Finishing shopping</StyledDialogTitle>
        <DialogContent>
          Checked items will be moved to items list. <br /> Type how much you
          spent for shopping.
          <TextField
            label='Amount'
            defaultValue={String(0)}
            onChange={e => changeCounter(e)}
            type='number'
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            onClick={() => toggleShowFinishDialog()}
          >
            Cancel
          </Button>
          <Button autoFocus color='primary' onClick={finishShopping}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
