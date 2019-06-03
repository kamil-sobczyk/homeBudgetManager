import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import { ListsContainer } from './listsContainer';
import { DialogsContainer } from '../dialogs/dialogsContainer';

export const ListBox = observer(({ store }: StoreProps) => {
  const {
    costs,
    items,
    selected,
    visibilityClient,
    itemMenagerClient,
    apiClient,
    shoppingClient,
    dndClient,
    callendarClient
  } = store;
  return (
    <>
      <ListsContainer
        getItems={apiClient.getItems}
        getSelected={apiClient.getSelected}
        items={items}
        selected={selected}
        toggleShowItems={visibilityClient.toggleShowItems}
        toggleCheckItems={itemMenagerClient.toggleCheckItems}
        showItems={visibilityClient.showItems}
        setActiveItem={itemMenagerClient.setActiveItem}
        deleteItem={itemMenagerClient.deleteItem}
        onDragEnd={dndClient.onDragEnd}
        setVisibleDialog={visibilityClient.setVisibleDialog}
        visibleDialog={visibilityClient.visibleDialog}
      />
      <DialogsContainer
        costs={costs}
        items={items}
        selected={selected}
        visibilityClient={visibilityClient}
        itemMenagerClient={itemMenagerClient}
        apiClient={apiClient}
        shoppingClient={shoppingClient}
        callendarClient={callendarClient}
      />
    </>
  );
});
