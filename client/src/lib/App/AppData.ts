import { Context } from "./Context";

export class AppData {
  readonly context: Context;

  constructor(context: Context) {
    this.context = context;
    this.init();
  }

  init = () => {
    // Something to init
  };
}
