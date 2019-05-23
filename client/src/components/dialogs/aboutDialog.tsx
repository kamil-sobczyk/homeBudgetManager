import * as React from 'react';

import { observer } from 'mobx-react';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';
import { observable } from 'mobx';
import { IconButton } from '@rmwc/icon-button';

@observer
export class AboutDialog extends React.Component<{}, {}> {
  @observable showFail?: boolean = false;

  render() {
    return (
      <Dialog
        open={true}
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
            icon='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
            style={{width:'40px', height:'40px', backgroundSize: 'cover', padding: 0}}
            tag='a'
            target='_blank'
            href='https://github.com/Ogar616/homeBudgetCombine'
          />
          <IconButton
          icon='https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-512.png'
          style={{width:'35px', height:'35px', backgroundSize: 'cover', padding: 0}}
          tag='a'
          target='_blank'
          href='https://www.linkedin.com/in/kamilsobczyk6/'
        />
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

