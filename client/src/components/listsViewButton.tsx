import * as React from "react";

import * as styled from "styled-components";

import { Button } from "@rmwc/button";

import { Store } from "../lib/App/store";

interface ViewButtonProps {
    store: Store;
}

export class ViewButton extends React.Component<ViewButtonProps, {}> {
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
