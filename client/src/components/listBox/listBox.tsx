import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import { ListsContainer } from './listsContainer';
import { AddDialog } from '../dialogs/addDialog';
import { EditDialog } from '../dialogs/editDialog';
import { DeleteDialog } from '../dialogs/deleteDialog';
import { ShoppingDialog } from '../dialogs/shoppingDialog';

@observer
export class ListBox extends React.Component<StoreProps, {}> {
  render() {
    const {
      store
    } = this.props;

    return (
      <>
        <ListsContainer {...this.props} />
        <AddDialog {...this.props} />
        <EditDialog 
          name={store.itemMenagerClient.currentItemName}
          info={store.itemMenagerClient.currentItemInfo}
          onChangeName={store.itemMenagerClient.updateCurrentItemName}
          onChangeInfo={store.itemMenagerClient.updateCurrentItemInfo}
          isVisible={store.visibilityClient.showEditDialog}
          hide={store.visibilityClient.toggleShowEditDialog}
        />
        <DeleteDialog {...this.props} />
        <ShoppingDialog {...this.props} />
      </>
    );
  }
}
