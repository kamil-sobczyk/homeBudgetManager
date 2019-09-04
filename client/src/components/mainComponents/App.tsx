import * as React from 'react';

import styled from 'styled-components';

import { Store } from '../../lib/mobx/rootStore';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import { LoginDialog } from '../dialogs/loggingDialogs/loginDialog';
import { Navbar } from './navbar/navbar';
import { ListBox } from '../listBox/listBox';
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
      visibilityClient: {
        toggleShowDrawer,
        showDrawer,
        setVisibleDialog,
        visibleDialog
      },
      itemManagerClient: { toggleEditItems }
    } = this.store;

    if (localStorage.id) {
      return (
        <Provider store={this.store}>
          <Container>
            <Navbar
              toggleShowDrawer={toggleShowDrawer}
              showDrawer={showDrawer}
              setVisibleDialog={setVisibleDialog}
              toggleEditItems={toggleEditItems}
            />
            <ListBox store={this.store} />
          </Container>
        </Provider>
      );
    } else {
      return (
        <LoginDialog
          visibleDialog={visibleDialog}
          setVisibleDialog={setVisibleDialog}
          setUser={this.store.apiClient.setUser}
        />
      );
    }
  }
}

const Container = styled.div`
  text-align: 'center';
`;
