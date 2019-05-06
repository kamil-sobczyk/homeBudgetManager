import * as React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   DialogButton
// } from "rmwc/Dialog";
// import { Typography } from "@rmwc/Typography";

interface ConfirmPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  body: string;
  confirmBtnText: string;
  cancelBtnText: string;
  nosaveButtons?: boolean;
}

@observer
export class ConfirmPopup extends React.Component<ConfirmPopupProps, {}> {
  render() {
    // const {
    //   open,
    //   onClose,
    //   onConfirm,
    //   onCancel,
    //   title,
    //   body,
    //   nosaveButtons = false,
    //   confirmBtnText,
    //   cancelBtnText
    // } = this.props;

    return (<></>
      // <StyledDialog open={open} onClose={onClose}>
      //   <DialogTitle>{title}</DialogTitle>
      //   <DialogContent>
      //     <Typography use="headline1">{body}</Typography>
      //   </DialogContent>
      //   <DialogActions>
      //     <DialogButton outlined onClick={onCancel} action="close">
      //       {cancelBtnText}
      //     </DialogButton>
      //     {!nosaveButtons && (
      //       <DialogButton unelevated onClick={onConfirm} action="accept">
      //         {confirmBtnText}
      //       </DialogButton>
      //     )}
      //   </DialogActions>
      // </StyledDialog>
    );
  }
}

// const StyledDialog = styled(Dialog)`
//   &&& {
//     z-index: 200;
//     .mdc-dialog__container {
//       max-width: 96%;
//       width: 400px;
//       min-width: inherit;

//       .mdc-dialog__surface {
//         max-width: 100%;
//         width: 400px;
//         min-width: inherit;
//         justify-content: center;
//         display: flex;
//         flex-direction: column;

//         .mdc-dialog__title {
//           text-align: center;
//           font-size: 17px;
//           margin: 24px 0 0;
//           &:before {
//             height: 20px;
//           }
//         }

//         .mdc-dialog__content {
//           justify-content: center;
//           text-align: center;
//           display: flex;
//           padding: 20px 24px;

//           .mdc-typography--headline1 {
//             text-align: center;
//             font-size: 13px;
//             line-height: 16px;
//             color: #7b7b7b;
//           }
//         }

//         .mdc-dialog__actions {
//           justify-content: center;
//           flex-wrap: wrap;
//           display: flex;
//           align-items: center;
//           flex-direction: row;
//           margin-bottom: 15px;
//           > * {
//             margin: 5px;
//             min-width: 120px;
//             &:first-child {
//               margin-left: 0px;
//             }
//             &:last-child {
//               margin-right: 0px;
//             }
//           }
//         }
//       }
//     }
//   }
// `;
