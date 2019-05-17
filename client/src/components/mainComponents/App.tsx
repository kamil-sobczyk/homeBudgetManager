import * as React from 'react';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import styled from 'styled-components';

import { Navbar } from './nav';
import { ListBox } from '../listBox/listBox';
import { Store } from '../../lib/mobx/rootStore';
import { ProgressBar } from './progressBar';

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
          <Navbar toggleShowSpendingsDialog={this.store.visibilityClient.toggleShowSpendingsDialog}/>
          <ListBox store={this.store} />
        </Container>
      </Provider>
    );
  }
}

const Container = styled.div`
  text-align: 'center';
  height: 100vh;
`;
