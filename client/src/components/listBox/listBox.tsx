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
    languagesClient: {
      getLangBase, getChosenLanguage
    }
  } = store;
  const langData = (getLangBase() as any)[getChosenLanguage()];

  return (
    <>
      <ListsContainer
        getItems={apiClient.getItems}
        getSelected={apiClient.getSelected}
        items={items}
        categorizedItems={categorizedItems}
        selected={selected}
        toggleShowItems={visibilityClient.toggleShowItems}
        toggleCheckItems={itemManagerClient.toggleCheckItems}
        showItems={visibilityClient.showItems}
        setActiveItem={itemManagerClient.setActiveItem}
        deleteItem={itemManagerClient.deleteItem}
        onDragEnd={dndClient.onDragEnd}
        setVisibleDialog={visibilityClient.setVisibleDialog}
        visibleDialog={visibilityClient.visibleDialog}
        getChosenCategory={itemManagerClient.getChosenCategory}
        setChosenCategory={itemManagerClient.setChosenCategory}
        areItemsEditable={itemManagerClient.areItemsEditable}
        langData={langData.list}
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
        langData={langData}
      />
    </>
  );
});
