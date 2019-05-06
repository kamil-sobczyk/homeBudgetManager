import { AppData } from "./AppData";

export class Context {
  readonly appData: AppData;

  constructor() {
    this.appData = new AppData(this);
  }

  init = async () => {
    // Something to init
  };
}
