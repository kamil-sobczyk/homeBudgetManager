import * as React from 'react';

import GoogleLogin from 'react-google-login';

import { Dialog, DialogTitle } from '@rmwc/dialog';

import { observer } from 'mobx-react';
import styled from 'styled-components';

interface LoginDialogProps {
  visibleDialog: string;
  setVisibleDialog: (dialog?: string) => string;
  setUserEmail: (email: string) => string;
  addUser: (user: string) => void;
}

@observer
export class LoginDialog extends React.Component<LoginDialogProps, {}> {
  render() {
    const {
      visibleDialog,
      setVisibleDialog,
      setUserEmail,
      addUser
    } = this.props;

    const responseGoogle = (response: any) => {
      console.log(response);
      if (!response.profileObj) {
        addUser('ogar616@gmail.com');
        // setUserEmail(response.profileObj.email);
        setVisibleDialog();
      }
    };

    return (
      <Dialog
        open={visibleDialog === 'LoginDialog'}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle>LOGIN WITH GOOGLE ACCOUNT</DialogTitle>
        <StyledLoginContainer
          clientId='21462024369-kc67gih727cs3gctmvfe5iede4t9sdqe.apps.googleusercontent.com'
          buttonText='LOGIN WITH GOOGLE'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </Dialog>
    );
  }
}

const StyledLoginContainer = styled(GoogleLogin)`
  display: flex;
  justify-content: center;
`;
