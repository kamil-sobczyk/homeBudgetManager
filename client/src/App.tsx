import * as React from "react";
import { observable } from "mobx";
import { observer, Provider } from "mobx-react";

import styled from "styled-components";

import { Navbar } from "./components/nav";
import { ListBox } from "./components//listBox";
import { Context } from "./lib/App/Context";
import { store } from "./lib/App/store";
import { ProgressBar } from "./components/UI/ProgressBar";
// import { HomePage } from "./components/Page/HomePage";

@observer
export class App extends React.Component<{}, {}> {
  @observable loading: boolean = true;

  componentDidMount() {
    this.loading = false;
  }

  render() {
    if (this.loading) {
      return <ProgressBar />;
    }

    if (!store) {
      return <div>App initialization error!</div>;
    }

    return (
      <Provider>
        <Container>
          <Navbar />
          <ListBox/>
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
