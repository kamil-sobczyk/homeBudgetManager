import * as React from 'react';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import styled from 'styled-components';

import { LoginDialog } from './loginDialog';
import { Navbar } from './navbar/navbar';
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

    const {
      toggleShowDrawer,
      showDrawer,
      setVisibleDialog,
      visibleDialog
    } = this.store.visibilityClient;

    if (localStorage.id) {
      return (
        <Provider store={this.store}>
          <Container>
            <Navbar
              toggleShowDrawer={toggleShowDrawer}
              showDrawer={showDrawer}
              setVisibleDialog={setVisibleDialog}
              visibleDialog={visibleDialog}
            />
            <ListBox store={this.store} />
          </Container>
        </Provider>
      );
    } else
      return (
        <LoginDialog
          visibleDialog={visibleDialog}
          setVisibleDialog={setVisibleDialog}
          setUser={this.store.apiClient.setUser}
        />
      );
  }
}

const Container = styled.div`
  text-align: 'center';
  height: 100vh;
`;
