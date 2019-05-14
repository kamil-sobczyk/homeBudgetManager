import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from '@rmwc/button';
import { Dialog, DialogActions, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';

interface EditDialogProps {
  name?: string;
  info?: string;
  onChangeName: (name: string) => void;
  onChangeInfo: (info: string) => void;
  isVisible: boolean;
  hide: () => void;
}

@observer
export class EditDialog extends React.Component<EditDialogProps, {}> {
  @observable name?: string = '';
  @observable info?: string = '';
  
  componentWillReceiveProps(props: EditDialogProps) {
    this.name = props.name;
    this.info = props.info;
  }

  confirm = (): void => {
    const {
      onChangeName,
      onChangeInfo
    } = this.props;

    onChangeName(this.name ? this.name : '');
    onChangeInfo(this.info ? this.info : '');
  };

  private updateName = (e: React.FormEvent<HTMLInputElement>): void => {
    this.name = e.currentTarget.value;
  };

  private updateInfo = (e: React.FormEvent<HTMLInputElement>): void => {
    this.info = e.currentTarget.value;
  };

  render() {
    const {
      isVisible,
      hide
    } = this.props;

    return (
      <Dialog open={isVisible}>
        <DialogTitle>Edit product</DialogTitle>
        <TextField
          id='outlined-required'
          label='Type new name'
          value={this.name}
          name='name'
          onChange={this.updateName}
        />
        <TextField
          id='outlined'
          label='Type new info'
          value={this.info}
          name='info'
          onChange={this.updateInfo}
        />
        <DialogActions>
          <Button
            color='primary'
            onClick={hide}
          >
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
