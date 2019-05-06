import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { Snackbar } from "rmwc/Snackbar";
import { ConfirmPopup } from "../UI/ConfirmPopup";
import { SnackBarCtrl } from "../../lib/Controller/SnackBarCtrl";
import { ConfirmPopupCtrl } from "../../lib/Controller/ConfirmPopupCtrl";

@observer
export class PageWrapper extends React.Component<{}, {}> {
  render() {
    const { children } = this.props;

    return (
      <PageWrapperElement>
        {children}
        <StyledSnackbar {...SnackBarCtrl.props} />
        <ConfirmPopup
          open={ConfirmPopupCtrl.open}
          {...ConfirmPopupCtrl.modalProps}
        />
      </PageWrapperElement>
    );
  }
}

const PageWrapperElement = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledSnackbar = styled(Snackbar)`
  &&& {
    &.mdc-snackbar--active {
      bottom: 20px;
    }
  }
`;
