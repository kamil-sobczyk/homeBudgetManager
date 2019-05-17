import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import { ListsContainer } from './listsContainer';
import { DialogsContainer } from '../dialogs/dialogsContainer';

@observer
export class ListBox extends React.Component<StoreProps, {}> {
  render() {
    const {
      costs,
      items,
      selected,
      visibilityClient,
      itemMenagerClient,
      apiClient,
      shoppingClient,
      dndClient
    } = this.props.store;

    return (
      <>
        <ListsContainer
          getItems={apiClient.getItems}
          getSelected={apiClient.getSelected}
          items={items}
          selected={selected}
          toggleshowAddItemDialog={visibilityClient.toggleshowAddItemDialog}
          toggleShowFinishShoppingDialog={visibilityClient.toggleShowFinishShoppingDialog}
          toggleShowDeleteItemDialog={visibilityClient.toggleShowDeleteItemDialog}
          toggleShowAddBillDialog={visibilityClient.toggleShowAddBillDialog}
          toggleShowItems={visibilityClient.toggleShowItems}
          toggleCheckItems={itemMenagerClient.toggleCheckItems}
          toggleShowEditDialog={visibilityClient.toggleShowEditDialog}
          showdeleteItemDialog={visibilityClient.showdeleteItemDialog}
          showItems={visibilityClient.showItems}
          setActiveItem={itemMenagerClient.setActiveItem}
          deleteItem={itemMenagerClient.deleteItem}
          onDragEnd={dndClient.onDragEnd}
        />
        <DialogsContainer
          costs={costs}
          items={items}
          selected={selected}
          visibilityClient={visibilityClient}
          itemMenagerClient={itemMenagerClient}
          apiClient={apiClient}
          shoppingClient={shoppingClient}
        />
      </>
    );
  }
}
