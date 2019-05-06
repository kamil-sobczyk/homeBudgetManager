import * as React from "react";
import { observable } from "mobx";
import { observer, Provider } from "mobx-react";

import styled from "styled-components";

import { Navbar } from "./components/nav";
import { Context } from "./lib/App/Context";
import { Store } from "./lib/App/Store";
// import { ProgressBar } from "./components/UI/ProgressBar";
// import { HomePage } from "./components/Page/HomePage";

@observer
export class App extends React.Component<{}, {}> {
  @observable loading: boolean = true;
  store?: Store;

  async componentDidMount() {
    const context = new Context();
    await context.init();
    this.store = new Store(context);
    this.loading = false;
  }

  render() {
    if (this.loading) {
      return null
      // <ProgressBar />;
    }

    if (!this.store) {
      return <div>App initialization error!</div>;
    }

    return (
      <Provider store={this.store}>
        <Container>
          <Navbar />
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
