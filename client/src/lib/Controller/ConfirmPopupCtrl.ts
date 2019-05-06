import { action, computed, observable } from "mobx";

export interface ConfirmData {
  cancelBtnText: string;
  confirmBtnText: string;
  title: string;
  body: string;
  nosaveButtons?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

class ConfirmCtrl {
  @observable protected isOpen = false;
  @observable protected cancelBtnText = "";
  @observable protected confirmBtnText = "";
  @observable protected title: string = "";
  @observable protected body: string = "";
  @observable protected nosaveButtons?: boolean;
  @observable protected onCancel?: () => void | Promise<void>;
  @observable protected onConfirm?: () => void | Promise<void>;
  @observable protected onClose?: () => void | Promise<void>;

  @action confirm = (data: ConfirmData) => {
    this.onCancel = data.onCancel;
    this.onConfirm = data.onConfirm;
    this.onClose = data.onClose;
    this.cancelBtnText = data.cancelBtnText;
    this.confirmBtnText = data.confirmBtnText;
    this.title = data.title;
    this.body = data.body;
    this.nosaveButtons = data.nosaveButtons;

    this.isOpen = true;
  };

  @computed get modalProps() {
    return {
      onCancel: async () => {
        if (this.onCancel) {
          await this.onCancel();
        }

        this.isOpen = false;
      },
      onConfirm: async () => {
        if (this.onConfirm) {
          await this.onConfirm();
        }

        this.isOpen = false;
      },
      onClose: async () => {
        if (this.onClose) {
          await this.onClose();
        }

        this.isOpen = false;
      },

      nosaveButtons: this.nosaveButtons,
      cancelBtnText: this.cancelBtnText,
      confirmBtnText: this.confirmBtnText,
      title: this.title,
      body: this.body
    };
  }

  @computed get open() {
    return this.isOpen;
  }
}

export const ConfirmPopupCtrl = new ConfirmCtrl();
