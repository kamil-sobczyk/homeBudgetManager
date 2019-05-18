import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Cost } from '../../lib/interfaces';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';

import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';
import { observable } from 'mobx';

interface FinishShoppingDialogProps {
  toggleShowFinishShoppingDialog: (cost?: Cost) => void;
  changeCounter: (event: React.FormEvent<EventTarget>) => void;
  finishShopping: () => void;
  showFinish: boolean;
  count: number;
}

@observer
export class FinishShoppingDialog extends React.Component<
  FinishShoppingDialogProps,
  Cost
> {
  @observable count: number = this.props.count;

  render() {
    const {
      showFinish,
      toggleShowFinishShoppingDialog,
      changeCounter,
      finishShopping
    } = this.props;

    return (
      <Dialog
        aria-describedby='alert-dialog-description'
        aria-labelledby='alert-dialog-title'
        open={showFinish}
      >
        <StyledDialogTitle id='alert-dialog-title'>
          Finishing shopping
        </StyledDialogTitle>
        <StyledDialogContent>
          Checked items will be moved to items list. <br /> Type how much you
          spent for shopping.
          <TextField
            label='Amount'
            defaultValue={String(0)}
            onChange={e => changeCounter(e)}
            type='number'
            required
          />
        </StyledDialogContent>
        <DialogActions>
          <Button
            color='primary'
            onClick={() => toggleShowFinishShoppingDialog()}
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

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
