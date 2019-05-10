import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';
import { Item } from '../../lib/interfaces';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';

import { sortItemsByName } from '../../lib/reorderFunctions';

interface FinishDialogState {
  chosenNames: string[];
  count: number;
  date: string;
}

@observer
export class FinishDialog extends React.Component<
  StoreProps,
  FinishDialogState
> {
  state = {
    chosenNames: [],
    count: 0,
    date: String(
      new Date().toLocaleDateString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit'
      })
    )
  };

  componentDidMount = (): void => {
    // getItemsFromServer(this.props.getItems);
  };

  handleChangeCounter = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    this.setState({
      count: Number(target.value)
    });
  };

  handleFinish = (): void => {
    const { items, selected } = this.props.store;
    const newSelected: Item[] = [];
    let newItems: Item[] = [];
    const chosenNames: string[] = [];

    newItems = items;
    selected.forEach((item: Item, index: number) => {
      if (item.checked) {
        newItems.push(item);
        chosenNames.push(item.name);
      } else newSelected.push(item);
    });

    const item: FinishDialogState = this.state;
    item.count = Math.round(this.state.count); ////////////////////
    item.chosenNames = chosenNames;
    sortItemsByName(newItems);

    // getSelected(newSelected);
    // changeSelectedOnServer(newSelected);
    // getItems(newItems);
    // changeItemsOnServer(newItems);
    // addCostsOnServer(getCosts, item);
    // handleOpenFinish();
  };

  render() {
    const {
      showFinish,
      toggleShowFinishDialog
    } = this.props.store.visibilityClient;

    return (
      <Dialog
        aria-describedby='alert-dialog-description'
        // onClose={this.handleClose}
        aria-labelledby='alert-dialog-title'
        open={showFinish}
        // TransitionComponent={Transition}
        // keepMounted
      >
        <DialogTitle id='alert-dialog-title'>
          {'Finishing shopping'}
        </DialogTitle>
        <DialogContent>
          Checked items will be moved to items list. <br /> Type how much you
          spent for shopping.
          <TextField
            id='outlined-adornment-number'
            label='Amount'
            // defaultValue={0}
            onChange={this.handleChangeCounter}
            type='number'
            // InputProps={{
            //   inputProps: { min: 0 },
            //   endAdornment: <InputAdornment position="end">PLN</InputAdornment>
            // }}
            // margin="normal"
            // variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={toggleShowFinishDialog}>
            Cancel
          </Button>
          <Button autoFocus color='primary' onClick={this.handleFinish}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
