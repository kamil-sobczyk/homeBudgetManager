import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import { ListsContainer } from './listsContainer';
import { DialogsContainer } from '../dialogs/dialogsContainer';

export const ListBox = observer(({ store }: StoreProps) => {
  const {
    costs,
    items,
    categorizedItems,
    incomes,
    selected,
    visibilityClient,
    itemManagerClient,
    apiClient,
    shoppingClient,
    dndClient,
    calendarClient,
    costManagerClient,
    incomesManagerClient,
    setItemsCategorized
  } = store;
  return (
    <>
      <ListsContainer
        getItems={apiClient.getItems}
        getSelected={apiClient.getSelected}
        items={items}
        categorizedItems={categorizedItems}
        selected={selected}
        getCategories={itemManagerClient.getCategories}
        toggleShowItems={visibilityClient.toggleShowItems}
        toggleCheckItems={itemManagerClient.toggleCheckItems}
        showItems={visibilityClient.showItems}
        setActiveItem={itemManagerClient.setActiveItem}
        deleteItem={itemManagerClient.deleteItem}
        onDragEnd={dndClient.onDragEnd}
        setVisibleDialog={visibilityClient.setVisibleDialog}
        visibleDialog={visibilityClient.visibleDialog}
        setItems={itemManagerClient.setItems}
        setItemsCategorized={setItemsCategorized}
      />
      <DialogsContainer
        costs={costs}
        items={items}
        incomes={incomes}
        selected={selected}
        visibilityClient={visibilityClient}
        itemManagerClient={itemManagerClient}
        apiClient={apiClient}
        shoppingClient={shoppingClient}
        calendarClient={calendarClient}
        costManagerClient={costManagerClient}
        incomesManagerClient={incomesManagerClient}
      />
    </>
  );
});
