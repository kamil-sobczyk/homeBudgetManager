import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import { ListsContainer } from './listsContainer';
import { DialogsContainer } from '../dialogs/dialogsContainer';

@observer
export class ListBox extends React.Component<StoreProps> {
  shouldComponentUpdate = (oldProps: StoreProps) =>
    this.props.store !== oldProps.store;

  render() {
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
      PaginationManagerClient
    } = this.props.store;

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
          onDragStart={dndClient.onDragStart}
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
          getChosenCategory={itemManagerClient.getChosenCategory}
          setChosenCategory={itemManagerClient.setChosenCategory}
          areItemsEditable={itemManagerClient.areItemsEditable}
          pagesManager={PaginationManagerClient}
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
  }
}
