import * as React from "react";

import * as styled from "styled-components";

import { Button } from "@rmwc/button";

import { store } from "../lib/App/store";

export class ViewButton extends React.Component<{}, {}> {
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
    store.toggleShowItems();
  };

  render() {
    return <Button onClick={this.handleClick}>{this.state.text}</Button>;
  }
}
