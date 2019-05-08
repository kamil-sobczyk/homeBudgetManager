import * as React from "react";
import * as styled from "styled-components";
import { Button } from "@rmwc/button";

import { TextField } from "@rmwc/textfield";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@rmwc/dialog";

import { Item } from "../../lib/interfaces";

import { Store } from "../../lib/App/store";

import { sortItemsByName } from "../../functions/reorderFunctions";

interface FinishDialogProps {
  store: Store;
}

interface FinishDialogState {
  count: number;
  date: string;
  chosenItems: Item[];
}

export class FinishDialog extends React.Component<
  FinishDialogProps,
  FinishDialogState
> {
  state = {
    count: 0,
    date: String(
      new Date().toLocaleDateString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit"
      })
    ),
    chosenItems: []
  };

  componentDidMount = (): void => {
    // getItemsFromServer(this.props.getItems);
  };

  handleChangeCounter = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      count: Number(target.value)
    });
  };

  handleFinish = (): void => {
    const {
      selected,
      items,
      getSelected,
      getItems,
      getCosts
    } = this.props.store;
    const newSelected: Item[] = [];
    let newItems: Item[] = [];
    const chosenNames: any = [];

    newItems = items;
    selected.forEach((item: Item, index: number) => {
      if (item.checked) {
        newItems.push(item);
        chosenNames.push(item.name);
      } else newSelected.push(item);
    });

    const item = this.state;
    item.count = Math.round(this.state.count); ////////////////////
    item.chosenItems = chosenNames;
    sortItemsByName(newItems);

    // getSelected(newSelected);
    // changeSelectedOnServer(newSelected);
    // getItems(newItems);
    // changeItemsOnServer(newItems);
    // addCostsOnServer(getCosts, item);
    // handleOpenFinish();
  };

  render() {
    const { showFinish, toggleShowFinishDialog } = this.props.store;

    return (
      <Dialog
        open={showFinish}
        // onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // TransitionComponent={Transition}
        // keepMounted
      >
        <DialogTitle id="alert-dialog-title">
          {"Finishing shopping"}
        </DialogTitle>
        <DialogContent>
          Checked items will be moved to items list. <br /> Type how much you
          spent for shopping.
          <TextField
            id="outlined-adornment-number"
            label="Amount"
            // defaultValue={0}
            onChange={this.handleChangeCounter}
            type="number"
            // InputProps={{
            //   inputProps: { min: 0 },
            //   endAdornment: <InputAdornment position="end">PLN</InputAdornment>
            // }}
            // margin="normal"
            // variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={toggleShowFinishDialog}>
            Cancel
          </Button>
          <Button color="primary" autoFocus onClick={this.handleFinish}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
