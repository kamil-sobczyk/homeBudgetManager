import * as React from "react";
import { observable } from "mobx";
import { observer, Provider } from "mobx-react";


import styled from "styled-components";

import { Navbar } from "./components/nav";
import { ListBox } from "./components//listBox";
import { Store } from "./lib/App/store";
import { ProgressBar } from "./components/UI/ProgressBar";

@observer
export class App extends React.Component<{}, {}> {
  @observable loading: boolean = true;
  store?: Store;

  componentDidMount() {
    this.loading = false;
    this.store = new Store();
  }

  render() {
    if (this.loading) {
      return <ProgressBar />;
    }

    if (!this.store) {
      return <div>App initialization error!</div>;
    }

    return (
      <Provider store={this.store}>
        <Container>
          <Navbar />
          <ListBox store={this.store} />
        </Container>
      </Provider>
    );
  }
}

const Container = styled.div`
  text-align: "center";
`;

console.log("app running");
