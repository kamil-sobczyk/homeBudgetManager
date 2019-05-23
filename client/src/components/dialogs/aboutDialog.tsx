import * as React from 'react';

import { observer } from 'mobx-react';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';

import { StyledDialogTitle } from './spendingsDialog/spendingsDialog';

const aboutDialogButtons = [
  {
    icon:
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    size: '40px',
    href: 'https://github.com/Ogar616/homeBudgetCombine'
  },
  {
    icon:
      'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-512.png',
    size: '35px',
    href: 'https://www.linkedin.com/in/kamilsobczyk6/'
  }
];

interface AboutDialogProps {
  setVisibleDialog: (dialog?: string) => string;
  visibleDialog: string;
}

export const AboutDialog = observer(
  ({ visibleDialog, setVisibleDialog }: AboutDialogProps) => (
    <Dialog
      open={visibleDialog === 'AboutDialog'}
      aria-labelledby='about'
      aria-describedby='about'
    >
      <StyledDialogTitle id='alert-dialog-title'>
        Home Budget Menager
      </StyledDialogTitle>
      <DialogContent id='alert-dialog-description'>
        Coded by Kamil Sobczyk 2019
        <br />
        {aboutDialogButtons.map(button => (
          <IconButton
            key={button.icon}
            icon={button.icon}
            style={{
              width: button.size,
              height: button.size,
              backgroundSize: 'cover'
            }}
            tag='a'
            target='_blank'
            href={button.href}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setVisibleDialog()} color='primary' autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
);
