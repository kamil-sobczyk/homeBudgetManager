import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import { Item } from '../../../lib/interfaces';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';
import { observable } from 'mobx';

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

  handleOptionClick = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    
    this.chosenCategory = target.value;
    this.props.changeNewItem(event);
  };

  render() {
    const {
      changeNewItem,
      AddShoppingItem,
      setVisibleDialog,
      visibleDialog,
      getCategories
    } = this.props;

    return (
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
        <Select
          label='Category'
          onChange={e => this.handleOptionClick(e)}
          name='category'
          options={['New category', ...getCategories()]}
          required
        />
        {this.chosenCategory === 'New category' && (
          <TextField
            defaultValue={''}
            label='New category'
            name='newCat'
            onChange={e => changeNewItem(e)}
          />
        )}
        <DialogActions>
          <Button color='primary' onClick={() => setVisibleDialog()}>
            Cancel
          </Button>
          <Button color='primary' onClick={AddShoppingItem}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
