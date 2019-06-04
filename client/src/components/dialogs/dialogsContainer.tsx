import * as React from 'react';

import { observer } from 'mobx-react';

import { AddShoppingItemDialog } from './itemMenagementDialogs/addShoppingItemDialog';
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
import { CalendarDialog } from './calendarDialog/calendarDialog';
import { AddDayCostDialog } from './calendarDialog/addDayCostDialog';

interface DialogsContainerProps {
  items: Item[];
  selected: Item[];
  costs: Cost[];
  visibilityClient: Store['visibilityClient'];
  itemMenagerClient: Store['itemMenagerClient'];
  apiClient: Store['apiClient'];
  shoppingClient: Store['shoppingClient'];
  calendarClient: Store['calendarClient'];
}

export const DialogsContainer = observer(
  ({
    costs,
    items,
    selected,
    visibilityClient,
    visibilityClient: { visibleDialog, setVisibleDialog },
    itemMenagerClient,
    apiClient,
    shoppingClient,
    calendarClient
  }: DialogsContainerProps) => (
    <>
      {visibleDialog === 'AddShoppingItemDialog' && (
        <AddShoppingItemDialog
          items={items}
          selected={selected}
          AddShoppingItem={itemMenagerClient.AddShoppingItem}
          changeNewItem={itemMenagerClient.changeNewItem}
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
        />
      )}

      {visibleDialog === 'EditItemDialog' && (
        <EditDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          name={itemMenagerClient.currentItemName}
          info={itemMenagerClient.currentItemInfo}
          onChangeName={itemMenagerClient.updateCurrentItemName}
          onChangeInfo={itemMenagerClient.updateCurrentItemInfo}
          setOldItem={itemMenagerClient.setOldItem}
          editItem={itemMenagerClient.editItem}
        />
      )}

      {visibleDialog === 'DeleteItemDialog' && (
        <DeleteItemDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          items={items}
          deleteItem={itemMenagerClient.deleteItem}
          index={itemMenagerClient.activeItem.index}
        />
      )}

      {visibleDialog === 'SpendingsDialog' && (
        <SpendingsDialog
          getCosts={apiClient.getCosts}
          costs={costs}
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
        />
      )}

      {visibleDialog.includes('ChartDialog') && (
        <ChartDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          getCosts={apiClient.getCosts}
          costs={costs}
        />
      )}

      {visibleDialog === 'FinishShoppingDialog' && (
        <FinishShoppingDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          changeNewSpendingCounter={shoppingClient.changeNewSpendingCounter}
          finishShopping={shoppingClient.finishShopping}
          count={shoppingClient.count}
        />
      )}
      {visibleDialog === 'AddOtherDialog' && (
        <AddOtherDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          addNewSpending={shoppingClient.addNewSpending}
          changeNewSpendingName={shoppingClient.changeNewSpendingName}
          changeNewSpendingCounter={shoppingClient.changeNewSpendingCounter}
          count={shoppingClient.count}
          changeNewSpendingInfo={shoppingClient.changeNewSpendingInfo}
        />
      )}
      {visibleDialog.includes('Fail') && (
        <FailDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
        />
      )}
      {visibleDialog === 'AboutDialog' && (
        <AboutDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
        />
      )}
      {visibleDialog.includes('Calendar') && (
        <CalendarDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          showFailSnackbar={visibilityClient.showFailSnackbar}
          toggleShowFailSnackbar={visibilityClient.toggleShowFailSnackbar}
          datePicked={calendarClient.datePicked}
          setDatePicked={calendarClient.setDatePicked}
          getCosts={apiClient.getCosts}
          costs={costs}
        />
      )}
      {visibleDialog.includes('CalendarAddDayCostDialog') && (
        <AddDayCostDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          addNewSpending={shoppingClient.addNewSpending}
          changeNewSpendingName={shoppingClient.changeNewSpendingName}
          changeNewSpendingCounter={shoppingClient.changeNewSpendingCounter}
          changeNewSpendingInfo={shoppingClient.changeNewSpendingInfo}
          changeShoppingItems={shoppingClient.changeShoppingItems}
          count={shoppingClient.count}
          category={shoppingClient.category}
        />
      )}
    </>
  )
);
