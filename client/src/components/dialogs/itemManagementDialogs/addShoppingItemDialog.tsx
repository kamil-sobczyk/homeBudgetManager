import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import { Item, AddShoppingItemDialogLangData } from '../../../lib/interfaces';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';
import { observable } from 'mobx';
import { FailDialog } from '../infoDialogs/failDialog';
import { FailSnackbar } from '../calendarDialogs/snackbar';

interface AddShoppingItemDialogProps {
  AddShoppingItem: () => void;
  changeNewItem: (event: React.FormEvent<EventTarget>) => void;
  setVisibleDialog: (dialog?: string) => void;
  getCategories: () => string[];
  visibleDialog: string;
  items: Item[];
  selected: Item[];
  langData: AddShoppingItemDialogLangData;
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
      getCategories,
      langData
    } = this.props;

    const isNewCategoryChosen =
      this.chosenCategory === 'New category' ||
      this.chosenCategory === 'Nowa kategoria';

    return (
      <>
        <Dialog open={visibleDialog.includes('AddShoppingItemDialog')}>
          <StyledDialogTitle>{langData.title}</StyledDialogTitle>
          <TextField
            defaultValue={''}
            label={langData.fields.newItem}
            name='name'
            onChange={e => changeNewItem(e)}
            required
          />
          <TextField
            defaultValue={''}
            label={langData.fields.info}
            name='info'
            onChange={e => changeNewItem(e)}
          />
          {!isNewCategoryChosen && (
            <Select
              label={langData.fields.category}
              onChange={e => this.handleOptionClick(e)}
              required
              name='category'
              options={[
                langData.fields.newCategory,
                ...getCategories().filter(
                  (category: string) => category !== 'All' && category !== 'Wszystkie'
                )
              ]}
            />
          )}
          {isNewCategoryChosen && (
            <TextField
              defaultValue={''}
              label={langData.fields.newCategory}
              name='newCat'
              onChange={e => changeNewItem(e)}
              required
            />
          )}
          <DialogActions>
            <Button color='primary' onClick={() => setVisibleDialog()}>
              {langData.buttons.cancel}
            </Button>
            <Button color='primary' onClick={this.addNewItem}>
              {langData.buttons.ok}
            </Button>
          </DialogActions>
        </Dialog>
        <FailSnackbar
          showSnackbar={this.showFailSnackbar}
          text={langData.snackbar.text}
        />
      </>
    );
  }
}
