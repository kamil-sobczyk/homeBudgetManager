import * as React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';
import { Item } from '../../../lib/interfaces';

interface EditItemDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  onChangeName: (name: string) => void;
  onChangeInfo: (info: string) => void;
  setOldItem: () => void;
  editItem: (newItem: Item) => void;
  category: string;
  visibleDialog: string;
  name?: string;
  info?: string;
}

@observer
export class EditItemDialog extends React.Component<EditItemDialogProps, {}> {
  @observable name?: string = this.props.name;
  @observable info?: string = this.props.info;
  @observable category?: string;
  @observable isNameChangeInitialized: boolean = false;
  @observable isInfoChangeInitialized: boolean = false;

  confirm = (): void => {
    const {
      onChangeName,
      onChangeInfo,
      name,
      setVisibleDialog,
      editItem
    } = this.props;

    if (!this.isInfoChangeInitialized && !this.isNameChangeInitialized) {
      setVisibleDialog();
      return;
    } else if (
      this.isNameChangeInitialized &&
      this.name &&
      this.name.length < 1
    ) {
      setVisibleDialog('FailDialog');
      return;
    } else if (this.isNameChangeInitialized || this.isInfoChangeInitialized) {
      if (this.name && this.name.length > 0) {
        onChangeName(
          this.name && this.name.length > 0 ? this.name : name ? name : ''
        );
        onChangeInfo(this.info ? this.info : '');
        setVisibleDialog();
      } else {
        setVisibleDialog('FailDialog');

        return;
      }
    }
    editItem({
      name: this.name ? this.name : '',
      info: this.info ? this.info : '',
      id: String(new Date()),
      checked: false,
      category: ''
    });
  };

  private updateName = (e: React.FormEvent<HTMLInputElement>): void => {
    this.isInfoChangeInitialized = true;
    this.name = e.currentTarget.value;
  };

  private updateInfo = (e: React.FormEvent<HTMLInputElement>): void => {
    this.isInfoChangeInitialized = true;
    this.info = e.currentTarget.value;
  };

  render() {
    const { setVisibleDialog, visibleDialog } = this.props;

    return (
      <Dialog open={visibleDialog === 'EditItemDialog'}>
        <StyledDialogTitle>Edit product</StyledDialogTitle>
        <TextField
          label='Type new name'
          defaultValue={this.name}
          name='name'
          onChange={this.updateName}
        />
        <TextField
          label='Type new info'
          defaultValue={this.info}
          name='info'
          onChange={this.updateInfo}
        />
        <DialogActions>
          <Button color='primary' onClick={() => setVisibleDialog()}>
            Cancel
          </Button>
          <Button color='primary' onClick={this.confirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
