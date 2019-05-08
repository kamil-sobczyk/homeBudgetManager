import * as React from "react";

import * as styled from "styled-components";

import { Button } from "@rmwc/button";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from "@rmwc/dialog";
import { TextField } from "@rmwc/textfield";

import { Store } from "../../lib/App/store";
import { TableContainer } from "../shoppingTable/tableContainer";

interface ShoppingDialogProps {
  store: Store;
}

export class ShoppingDialog extends React.Component<ShoppingDialogProps, {}> {
  render() {
    const { toggleShowShoppingDialog, showShoppingDialog } = this.props.store;
    return (
      <>
        <Button onClick={toggleShowShoppingDialog}>
          Show previous shoppings
        </Button>
        <Dialog
          open={showShoppingDialog}
          //   onClose={showShoppingDialog}
          aria-label="shopping-you-made"
        >
          <DialogTitle>Shopping you made</DialogTitle>
          <DialogContent>
            {/*   <TableContainer {...this.props} />*/}
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleShowShoppingDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
