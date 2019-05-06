import { Context } from "./Context";

export class Store {
  public readonly context: Context;

  constructor(context: Context) {
    this.context = context;
  }
}
