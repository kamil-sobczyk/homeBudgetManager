import * as React from "react";

import * as styled from "styled-components";

import { Store } from '../../lib/App/store';

export class FailDialog extends React.Component <{}, {}> {
    render(){
        return(
            null
    //           <Dialog
    //   open={open}
    //   aria-labelledby="alert-dialog-title"
    //   aria-describedby="alert-dialog-description"
    //   TransitionComponent={Transition}
    //   keepMounted
    // >
    //   <DialogTitle id="alert-dialog-title">
    //     {"Unable to add new product to the list!"}
    //   </DialogTitle>
    //   <DialogContent>
    //     <DialogContentText id="alert-dialog-description">
    //       This product is on your list already.
    //     </DialogContentText>
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={onClose} color="primary" autoFocus>
    //       OK
    //     </Button>
    //   </DialogActions>
    // </Dialog>
        )
    }
}
