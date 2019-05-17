import * as React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

import { ListType } from '../../lib/interfaces';
import { StyledDialogTitle } from './spendingsDialog';

interface EditDialogProps {
  toggleShowFailDialog: () => void;
  onChangeName: (name: string) => void;
  onChangeInfo: (info: string) => void;
  hide: (list: ListType, index: number) => void;
  isVisible: boolean;
  name?: string;
  info?: string;
}

@observer
export class EditDialog extends React.Component<EditDialogProps, {}> {
  @observable name?: string = this.props.name;
  @observable info?: string = this.props.info;
  @observable isNameChangeInitialized: boolean = false;
  @observable isInfoChangeInitialized: boolean = false;

  confirm = (): void => {
    const {
      toggleShowFailDialog,
      onChangeName,
      onChangeInfo,
      hide,
      name
    } = this.props;

    if (!this.isInfoChangeInitialized && !this.isNameChangeInitialized) {
      hide('items', 0);
      return;
    } else if (
      this.isNameChangeInitialized &&
      this.name &&
      this.name.length < 1
    ) {
      toggleShowFailDialog();
      return;
    } else if (this.isNameChangeInitialized || this.isInfoChangeInitialized) {
      if (this.name && this.name.length > 0) {
        onChangeName(
          this.name && this.name.length > 0 ? this.name : name ? name : ''
        );
        onChangeInfo(this.info ? this.info : '');
        hide('items', 0);
      } else {
        toggleShowFailDialog();
        return;
      }
    } else return;
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
    const { isVisible, hide } = this.props;

    return (
      <Dialog open={isVisible}>
        <StyledDialogTitle>Edit product</StyledDialogTitle>
        <TextField
          id='outlined-required'
          label='Type new name'
          defaultValue={this.name}
          name='name'
          onChange={this.updateName}
        />
        <TextField
          id='outlined'
          label='Type new info'
          defaultValue={this.info}
          name='info'
          onChange={this.updateInfo}
        />
        <DialogActions>
          <Button color='primary' onClick={() => hide('items', 0)}>
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
