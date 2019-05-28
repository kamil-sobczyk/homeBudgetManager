import * as React from 'react';

import { observer } from 'mobx-react';

import { AddItemDialog } from './itemMenagementDialogs/addItemDialog';
import { EditDialog } from './itemMenagementDialogs/editItemDialog';
import { DeleteItemDialog } from './itemMenagementDialogs/deleteItemDialog';
import { SpendingsDialog } from './spendingsDialogs/spendingsDialog';
import { FinishShoppingDialog } from './spendingsDialogs/finishShoppingDialog';
import { Cost, Item } from '../../lib/interfaces';
import { Store } from '../../lib/mobx/rootStore';
import { FailDialog } from './infoDialogs/failDialog';
import { AddOtherDialog } from './spendingsDialogs/addOtherDialog';
import { AboutDialog } from './infoDialogs/aboutDialog';
import { ChartDialog } from './spendingsDialogs/chartDialog/chartDialog';

interface DialogsContainerProps {
  items: Item[];
  selected: Item[];
  costs: Cost[];
  visibilityClient: Store['visibilityClient'];
  itemMenagerClient: Store['itemMenagerClient'];
  apiClient: Store['apiClient'];
  shoppingClient: Store['shoppingClient'];
}

export const DialogsContainer = observer(
  ({
    costs,
    items,
    selected,
    visibilityClient,
    itemMenagerClient,
    apiClient,
    shoppingClient
  }: DialogsContainerProps) => (
    <>
      {visibilityClient.visibleDialog === 'AddItemDialog' && (
        <AddItemDialog
          items={items}
          selected={selected}
          addItem={itemMenagerClient.addItem}
          changeNewItem={itemMenagerClient.changeNewItem}
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
        />
      )}

      {visibilityClient.visibleDialog === 'EditItemDialog' && (
        <EditDialog
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
          name={itemMenagerClient.currentItemName}
          info={itemMenagerClient.currentItemInfo}
          onChangeName={itemMenagerClient.updateCurrentItemName}
          onChangeInfo={itemMenagerClient.updateCurrentItemInfo}
          setOldItem={itemMenagerClient.setOldItem}
        />
      )}

      {visibilityClient.visibleDialog === 'DeleteItemDialog' && (
        <DeleteItemDialog
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
          items={items}
          deleteItem={itemMenagerClient.deleteItem}
          index={itemMenagerClient.activeItem.index}
        />
      )}

      {visibilityClient.visibleDialog === 'SpendingsDialog' && (
        <SpendingsDialog
          getCosts={apiClient.getCosts}
          costs={costs}
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
        />
      )}

      {visibilityClient.visibleDialog === 'ChartDialog' && (
        <ChartDialog
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
          getCosts={apiClient.getCosts}
          costs={costs}
        />
      )}

      {visibilityClient.visibleDialog === 'FinishShoppingDialog' && (
        <FinishShoppingDialog
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
          changeNewSpendingNameCounter={shoppingClient.changeNewSpendingNameCounter}
          finishShopping={shoppingClient.finishShopping}
          count={shoppingClient.count}
        />
      )}
      {visibilityClient.visibleDialog === 'AddOtherDialog' && (
        <AddOtherDialog
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
          addNewSpending={shoppingClient.addNewSpending}
          changeNewSpendingName={shoppingClient.changeNewSpendingName}
          changeNewSpendingNameCounter={shoppingClient.changeNewSpendingNameCounter}
          count={shoppingClient.count}
        />
      )}
      {visibilityClient.visibleDialog === 'FailDialog' && (
        <FailDialog
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
        />
      )}
      {visibilityClient.visibleDialog === 'AboutDialog' && (
        <AboutDialog
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
        />
      )}
    </>
  )
);
