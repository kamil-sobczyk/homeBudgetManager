import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps, Cost } from '../../lib/interfaces';
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

@observer
export class FinishDialog extends React.Component<StoreProps, Cost> {
  state = {
    chosenItems: [],
    count: 0,
    date: String(
      new Date().toLocaleDateString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit'
      })
    )
  };

  handleChangeCounter = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;

    if (parseInt(target.value) > 0) {
      this.setState({
        count: parseInt(target.value)
      });
    } else {
      target.value = '0';
      this.setState({
        count: 0
      });
    }
  };

  handleFinish = (): void => {
    if (this.state.count < 1) return;

    const {
      items,
      selected,
      itemMenagerClient: { reorderItems },
      visibilityClient: { toggleShowFinishDialog }
    } = this.props.store;

    const newSelected: Item[] = [];
    let newItems: Item[] = [];
    const chosenItems: string[] = [];

    newItems = items;
    selected.forEach((item: Item) => {
      if (item.checked) {
        newItems.push(item);
        chosenItems.push(item.name);
      } else newSelected.push(item);
    });

    const item: Cost = this.state;
    item.count = Math.round(this.state.count);
    item.chosenItems = chosenItems;

    sortItemsByName(newItems);
    reorderItems(newItems, newSelected);
    toggleShowFinishDialog(item);
  };

  render() {
    const {
      showFinish,
      toggleShowFinishDialog
    } = this.props.store.visibilityClient;

    return (
      <Dialog
        aria-describedby='alert-dialog-description'
        aria-labelledby='alert-dialog-title'
        open={showFinish}
      >
        <DialogTitle id='alert-dialog-title'>'Finishing shopping'</DialogTitle>
        <DialogContent>
          Checked items will be moved to items list. <br /> Type how much you
          spent for shopping.
          <TextField
            label='Amount'
            defaultValue={String(0)}
            onChange={this.handleChangeCounter}
            type='number'
            required
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={() => toggleShowFinishDialog()}>
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
