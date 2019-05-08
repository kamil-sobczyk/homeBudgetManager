import * as React from "react";

import { Button } from "@rmwc/button";

import { StoreProps } from "./listBox";

export class ViewButton extends React.Component<StoreProps, {}> {
  state = {
    text: "ADD NEW ITEMS TO LIST"
  };

  handleClick = () => {
    this.setState({
      text:
        this.state.text === "ADD NEW ITEMS TO LIST"
          ? "SHOW ITEMS TO BUY ONLY"
          : "ADD NEW ITEMS TO LIST"
    });
    this.props.store.toggleShowItems();
  };

  render() {
    return <Button onClick={this.handleClick}>{this.state.text}</Button>;
  }
}
