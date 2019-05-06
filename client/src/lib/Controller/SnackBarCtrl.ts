import {action, computed, observable} from 'mobx';

enum SnackBarTypes {
  SUCCESS = '#38B77E',
  WARNING = '#ea9e18',
  ERROR = '#ED4967',
  DEFAULT = '#8D9191'
}

class SnackBarCtr {
  @observable protected isOpen = false;
  @observable protected message = '';
  @observable protected messageType: SnackBarTypes = SnackBarTypes.DEFAULT;

  @action success = (message: string) => {
    this.messageType = SnackBarTypes.SUCCESS;
    this.setMessageAndOpen(message);
  };

  @action error = (message: string) => {
    this.messageType = SnackBarTypes.ERROR;
    this.setMessageAndOpen(message);
  };

  @action warning = (message: string) => {
    this.messageType = SnackBarTypes.WARNING;
    this.setMessageAndOpen(message);
  };

  @computed get props() {
    return {
      show: this.isOpen,
      message: this.message,
      timeout: 2000,
      onShow: this.onShow,
      style: {
        backgroundColor: this.messageType,
      },
    };
  }

  @action protected onShow = () => {
    this.isOpen = false;
  };

  @action protected setMessageAndOpen = (msg: string) => {
    this.message = msg;
    this.isOpen = true;
  };
}

export const SnackBarCtrl = new SnackBarCtr();
