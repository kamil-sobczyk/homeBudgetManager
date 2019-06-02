import * as React from 'react';

import GoogleLogin from 'react-google-login';

import { Dialog, DialogTitle } from '@rmwc/dialog';

import { observer } from 'mobx-react';
import styled from 'styled-components';

interface LoginDialogProps {
  visibleDialog: string;
  setVisibleDialog: (dialog?: string) => void;
  setUser: (token: string, id: string) => void;
}

@observer
export class LoginDialog extends React.Component<LoginDialogProps, {}> {
  render() {
    const {
      visibleDialog,
      setVisibleDialog,
      setUser,
    } = this.props;

    const responseGoogle = (response: any) => {
        setUser(response.accessToken, response.googleId);
        setVisibleDialog();
    };

    const responseGoogleFailure = (response: GoogleLogin) => {
      console.log('failure', response);
    };

    return (
      <Dialog
        open={visibleDialog === 'LoginDialog'}
        aria-labelledby='Google login'
        aria-describedby='Login with google'
      >
        <DialogTitle>LOGIN WITH GOOGLE ACCOUNT</DialogTitle>
        <StyledLoginContainer
          clientId='21462024369-kc67gih727cs3gctmvfe5iede4t9sdqe.apps.googleusercontent.com'
          buttonText='LOGIN WITH GOOGLE'
          onSuccess={responseGoogle}
          onFailure={responseGoogleFailure}
        />
      </Dialog>
    );
  }
}

const StyledLoginContainer = styled(GoogleLogin)`
  display: flex;
  justify-content: center;
`;
