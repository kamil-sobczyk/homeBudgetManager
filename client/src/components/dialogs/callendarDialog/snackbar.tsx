import * as React from 'react';

import { Snackbar, SnackbarAction } from '@rmwc/snackbar';

interface FailSnackbarProps {
  showSnackbar: boolean;
}

export class FailSnackbar extends React.Component<FailSnackbarProps, {}> {
  render() {
    const { showSnackbar } = this.props;
    return (
      <Snackbar
        open={showSnackbar}
        message='Pick a date first'
        action={
          <SnackbarAction
            label='Close'
            onClick={() => console.log('Click Me')}
          />
        }
      />
    );
  }
}
