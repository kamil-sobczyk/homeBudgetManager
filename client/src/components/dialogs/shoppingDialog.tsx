import * as React from "react";

import { Button } from "@rmwc/button";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from "@rmwc/dialog";

import { StoreProps } from "../listBox";
import { TableContainer } from "../shoppingTable/tableContainer";

export class ShoppingDialog extends React.Component<StoreProps, {}> {
  render() {
    const { toggleShowShoppingDialog, showShoppingDialog } = this.props.store;
    return (
      <>
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
