import * as React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import styled from 'styled-components';

import { Cost } from '../../../lib/interfaces';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from './spendingsDialog';

interface FinishShoppingDialogProps {
  changeNewSpendingCounter: (event: React.FormEvent<EventTarget>) => void;
  finishShopping: () => void;
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  count: number;
}

@observer
export class FinishShoppingDialog extends React.Component<
  FinishShoppingDialogProps,
  Cost
> {
  @observable private count: number = this.props.count;

  render() {
    const {
      changeNewSpendingCounter,
      finishShopping,
      setVisibleDialog,
      visibleDialog
    } = this.props;

    return (
      <Dialog
        aria-describedby='alert-dialog-description'
        aria-labelledby='alert-dialog-title'
        open={visibleDialog === 'FinishShoppingDialog'}
      >
        <StyledDialogTitle>Finishing shopping</StyledDialogTitle>
        <StyledDialogContent>
          Checked items will be moved to items list. <br /> Type how much you
          spent for shopping.
          <TextField
            label='Amount'
            defaultValue={String(0)}
            onChange={e => changeNewSpendingCounter(e)}
            type='number'
            required
          />
        </StyledDialogContent>
        <DialogActions>
          <Button color='primary' onClick={() => setVisibleDialog()}>
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

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
