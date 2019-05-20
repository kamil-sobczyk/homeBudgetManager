import * as React from 'react';

import { observer } from 'mobx-react';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';
import { observable } from 'mobx';
import { IconButton } from '@rmwc/icon-button';
import { Icon } from '@rmwc/icon';

@observer
export class AboutDialog extends React.Component<{}, {}> {
  @observable showFail?: boolean = false;

  render() {
    return (
      <Dialog
        open={false}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <StyledDialogTitle id='alert-dialog-title'>
          Home Budget Menager
        </StyledDialogTitle>
        <DialogContent id='alert-dialog-description'>
          Coded by Kamil Sobczyk 2019
          <br />
          <IconButton
            >
            <Icon icon='../../lib/assets/git.svg' width='30px' height='30px'/>
            {' '}
            // <a href='https://github.com/Ogar616/homeBudgetCombine'>
              Github repository
            </a>
          </IconButton>
          <IconButton>
            <a href='https://www.linkedin.com/in/kamilsobczyk6/'>Linked IN</a>
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => null} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
