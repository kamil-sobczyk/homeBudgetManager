import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { Store } from "../../lib/App/Store";
import { PageWrapper } from "./PageWrapper";
import { Sample } from "../Sample/Sample";

interface HomePageProps {
  store: Store;
}

@observer
export class HomePage extends React.Component<HomePageProps, {}> {
  render() {
    const { store } = this.props;
    const { appData } = store.context;

    return (
      <PageWrapper>
        <Container>
          <h1>ts-tester</h1>
          <p>Hello world</p>
          <Sample appData={appData} />
        </Container>
      </PageWrapper>
    );
  }
}

const Container = styled.div`
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
