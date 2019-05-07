import * as React from "react";
import { observable } from "mobx";
import { observer, Provider } from "mobx-react";


import styled from "styled-components";

import { Navbar } from "./components/nav";
import { ListBox } from "./components//listBox";
import { Context } from "./lib/App/Context";
import { Store } from "./lib/App/store";
import { ProgressBar } from "./components/UI/ProgressBar";
// import { HomePage } from "./components/Page/HomePage";

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
        {/* <HomePage store={this.store} /> */}
      </Provider>
    );
  }
}

const Container = styled.div`
  textalign: "center";
`;

console.log("app running");
