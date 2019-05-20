import * as React from 'react';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@rmwc/dialog';

import { observer } from 'mobx-react';

interface LoginDialogProps {
  visibleDialog: string;
}

@observer
export class LoginDialog extends React.Component<LoginDialogProps, {}> {
  render() {
    const { visibleDialog } = this.props;
    const responseFacebook = (response: any) => {
      console.log(response);
    };

    const responseGoogle = (response: any) => {
      console.log(response);
    };

    return (
      <Dialog
        open={visibleDialog === 'LoginDialog'}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle>LOGIN WITH FACEBOOK AND GOOGLE</DialogTitle>

        <FacebookLogin
          appId='' //APP ID NOT CREATED YET
          fields='name,email,picture'
          callback={responseFacebook}
        />
        <br />
        <br />
        <GoogleLogin
          clientId='' //CLIENTID NOT CREATED YET
          buttonText='LOGIN WITH GOOGLE'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </Dialog>
    );
  }
}
