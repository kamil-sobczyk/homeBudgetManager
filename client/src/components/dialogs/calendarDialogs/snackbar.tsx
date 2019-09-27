import * as React from 'react';

import { Snackbar, SnackbarAction } from '@rmwc/snackbar';

interface FailSnackbarProps {
  showSnackbar: boolean;
  text: string;
}

export class FailSnackbar extends React.Component<FailSnackbarProps> {
  render() {
    const { showSnackbar, text } = this.props;
    return (
      <Snackbar
        open={showSnackbar}
        message={text}
        action={<SnackbarAction label='Close' />}
      />
    );
  }
}
