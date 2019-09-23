import * as React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import { Item } from '../../../lib/interfaces';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';

import { FailSnackbar } from '../calendarDialogs/snackbar';

interface AddShoppingItemDialogProps {
  AddShoppingItem: () => void;
  changeNewItem: (event: React.FormEvent<EventTarget>) => void;
  setVisibleDialog: (dialog?: string) => void;
  getCategories: () => string[];
  visibleDialog: string;
  items: Item[];
  selected: Item[];
}

@observer
export class AddShoppingItemDialog extends React.Component<
  AddShoppingItemDialogProps,
  {}
> {
  @observable chosenCategory = '';
  @observable showFailSnackbar = false;

  handleOptionClick = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;

    this.props.changeNewItem(event);
    this.chosenCategory = target.value;
  };

  addNewItem = () => {
    if (this.chosenCategory !== '') {
      this.props.AddShoppingItem();
    } else {
      this.showFailSnackbar = true;
    }
  };

  render() {
    const {
      changeNewItem,
      setVisibleDialog,
      visibleDialog,
      getCategories
    } = this.props;

    return (
      <>
        <Dialog open={visibleDialog.includes('AddShoppingItemDialog')}>
          <StyledDialogTitle>Add a new product</StyledDialogTitle>
          <TextField
            defaultValue={''}
            label='New item'
            name='name'
            onChange={e => changeNewItem(e)}
            required
          />
          <TextField
            defaultValue={''}
            label='Additional info'
            name='info'
            onChange={e => changeNewItem(e)}
          />
          {this.chosenCategory !== 'New category' && (
            <Select
              label='Category'
              onChange={e => this.handleOptionClick(e)}
              required
              name='category'
              options={[
                'New category',
                ...getCategories()
                  .filter((category: string) => category !== 'All')
                  .sort()
              ]}
            />
          )}
          {this.chosenCategory === 'New category' && (
            <TextField
              defaultValue={''}
              label='New category'
              name='newCat'
              onChange={e => changeNewItem(e)}
              required
            />
          )}
          <DialogActions>
            <Button color='primary' onClick={() => setVisibleDialog()}>
              Cancel
            </Button>
            <Button color='primary' onClick={this.addNewItem}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <FailSnackbar
          showSnackbar={this.showFailSnackbar}
          text='Please provide category'
        />
      </>
    );
  }
}
