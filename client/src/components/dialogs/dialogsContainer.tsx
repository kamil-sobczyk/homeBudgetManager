import * as React from 'react';

import { observer } from 'mobx-react';

import { AddShoppingItemDialog } from './itemManagementDialogs/addShoppingItemDialog';
import { EditItemDialog } from './itemManagementDialogs/editItemDialog';
import { DeleteItemDialog } from './itemManagementDialogs/deleteItemDialog';
import { SpendingsDialog } from './expensesDialogs/spendingsDialog';
import { FinishShoppingDialog } from './expensesDialogs/finishShoppingDialog';
import { Cost, Item, Income } from '../../lib/interfaces';
import { Store } from '../../lib/mobx/rootStore';
import { FailDialog } from './infoDialogs/failDialog';
import { AddNewExpenseDialog } from './expensesDialogs/addNewExpenseDialog';
import { AboutDialog } from './infoDialogs/aboutDialog';
import { ChartDialog } from './expensesDialogs/chartDialog/chartDialog';
import { CalendarDialog } from './calendarDialogs/calendarDialog';
import { AddDayCostDialog } from './calendarDialogs/addDayCostDialog';
import { CostManagerDialog } from './costManagementDialogs/costManagerDialog';
import { DeleteCostDialog } from './costManagementDialogs/deleteCostDialog';
import { EditCostDialog } from './costManagementDialogs/editCostDialog';
import { LogoutDialog } from './loggingDialogs/logoutDialog';
import { IncomesDialog } from './incomesDialogs/incomesDialog';
import { AddNewIncomeDialog } from './incomesDialogs/addNewIncomeDialog';
import { IncomesCallendarDialog } from './incomesDialogs/incomesCallendar';
import { DeleteIncomeDialog } from './incomesDialogs/deleteIncomeDialog';

interface DialogsContainerProps {
  items: Item[];
  selected: Item[];
  costs: Cost[];
  incomes: Income[];
  visibilityClient: Store['visibilityClient'];
  itemManagerClient: Store['itemManagerClient'];
  apiClient: Store['apiClient'];
  shoppingClient: Store['shoppingClient'];
  calendarClient: Store['calendarClient'];
  costManagerClient: Store['costManagerClient'];
  incomesManagerClient: Store['incomesManagerClient'];
}

export const DialogsContainer = observer(
  // tslint:disable-next-line: cyclomatic-complexity
  ({
    costs,
    items,
    incomes,
    selected,
    visibilityClient,
    visibilityClient: { visibleDialog, setVisibleDialog },
    itemManagerClient,
    apiClient,
    shoppingClient,
    calendarClient,
    costManagerClient,
    incomesManagerClient
  }: DialogsContainerProps) => (
    <>
      {visibleDialog === 'AddShoppingItemDialog' && (
        <AddShoppingItemDialog
          items={items}
          selected={selected}
          AddShoppingItem={itemManagerClient.AddShoppingItem}
          changeNewItem={itemManagerClient.changeNewItem}
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          getCategories={itemManagerClient.getCategories}
        />
      )}
      {visibleDialog === 'EditItemDialog' && (
        <EditItemDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          name={itemManagerClient.currentItemName}
          info={itemManagerClient.currentItemInfo}
          onChangeName={itemManagerClient.updateCurrentItemName}
          onChangeInfo={itemManagerClient.updateCurrentItemInfo}
          setOldItem={itemManagerClient.setOldItem}
          editItem={itemManagerClient.editItem}
          category={itemManagerClient.oldItem.category}
        />
      )}
      {visibleDialog === 'DeleteItemDialog' && (
        <DeleteItemDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          items={items}
          deleteItem={itemManagerClient.deleteItem}
          index={itemManagerClient.activeItem.index}
        />
      )}
      {visibleDialog === 'SpendingsDialog' && (
        <SpendingsDialog
          getCosts={apiClient.getCosts}
          costs={costs}
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          setChosenCost={shoppingClient.setChosenCost}
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
      {visibleDialog === 'AddNewExpenseDialog' && (
        <AddNewExpenseDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          addNewSpending={shoppingClient.addNewSpending}
          changeNewSpendingCategory={shoppingClient.changeNewSpendingCategory}
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
          getCosts={apiClient.getCosts}
          costs={costs}
          getCalendarViewDate={calendarClient.getCalendarViewDate}
          setDatePicked={calendarClient.setDatePicked}
          calendarViewDate={calendarClient.calendarViewDate}
          setChosenCost={shoppingClient.setChosenCost}
          getIncomes={apiClient.getIncomes}
          incomes={incomes}
        />
      )}
      {visibleDialog.includes('CalendarAddDayCostDialog') && (
        <AddDayCostDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          addNewSpending={shoppingClient.addNewSpending}
          changeNewSpendingCategory={shoppingClient.changeNewSpendingCategory}
          changeNewSpendingCounter={shoppingClient.changeNewSpendingCounter}
          changeNewSpendingInfo={shoppingClient.changeNewSpendingInfo}
          changeShoppingItems={shoppingClient.changeShoppingItems}
          count={shoppingClient.count}
          category={shoppingClient.category}
        />
      )}
      {visibleDialog.includes('CostManager') && (
        <CostManagerDialog
          cost={[shoppingClient.chosenCost]}
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
          setChosenCost={shoppingClient.setChosenCost}
          prevVisibleDialog={visibilityClient.prevVisibleDialog}
        />
      )}
      {visibleDialog.includes('DeleteCostDialog') && (
        <DeleteCostDialog
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
          cost={shoppingClient.chosenCost}
          prevVisibleDialog={visibilityClient.prevVisibleDialog}
          deleteCost={costManagerClient.deleteCost}
        />
      )}
      {visibleDialog.includes('EditCostDialog') && (
        <EditCostDialog
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
          cost={shoppingClient.chosenCost}
          changeNewSpendingCategory={shoppingClient.changeNewSpendingCategory}
          changeNewSpendingCounter={shoppingClient.changeNewSpendingCounter}
          changeNewSpendingInfo={shoppingClient.changeNewSpendingInfo}
          changeShoppingItems={shoppingClient.changeShoppingItems}
          category={shoppingClient.category}
          editCost={costManagerClient.editCost}
          prevVisibleDialog={visibilityClient.prevVisibleDialog}
          getCalendarViewDate={calendarClient.getCalendarViewDate}
          setDatePicked={calendarClient.setDatePicked}
          datePicked={calendarClient.datePicked}
          count={shoppingClient.count}
        />
      )}
      {visibleDialog.includes('LogoutDialog') && (
        <LogoutDialog
          setVisibleDialog={visibilityClient.setVisibleDialog}
          visibleDialog={visibilityClient.visibleDialog}
        />
      )}
      {visibleDialog.includes('IncomesDialog') && (
        <IncomesDialog
          visibleDialog={visibilityClient.visibleDialog}
          setVisibleDialog={visibilityClient.setVisibleDialog}
          getIncomes={apiClient.getIncomes}
          incomes={incomes}
          deleteIncome={apiClient.deleteIncome}
          setActiveIncome={incomesManagerClient.setActiveIncome}
        />
      )}
      {visibleDialog.includes('IncomesCalendarDialog') && (
        <IncomesCallendarDialog
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
          showFailSnackbar={visibilityClient.showFailSnackbar}
          toggleShowFailSnackbar={visibilityClient.toggleShowFailSnackbar}
          datePicked={calendarClient.datePicked}
          incomes={incomes}
          costs={costs}
          getCalendarViewDate={calendarClient.getCalendarViewDate}
          setDatePicked={calendarClient.setDatePicked}
          calendarViewDate={calendarClient.calendarViewDate}
          setChosenCost={shoppingClient.setChosenCost}
        />
      )}
      {visibleDialog.includes('AddNewIncomeDialog') && (
        <AddNewIncomeDialog
          addNewIncome={incomesManagerClient.addNewIncome}
          changeNewIncomeCategory={incomesManagerClient.changeIncomeCategory}
          changeNewIncomeCounter={incomesManagerClient.changeIncomeCount}
          changeNewIncomeInfo={incomesManagerClient.changeIncomeInfo}
          setVisibleDialog={setVisibleDialog}
          visibleDialog={visibleDialog}
        />
      )}
      {visibleDialog.includes('DeleteIncomeDialog') && (
        <DeleteIncomeDialog
        income={incomesManagerClient.activeIncome}
        setVisibleDialog={visibilityClient.setVisibleDialog}
        visibleDialog ={visibilityClient.visibleDialog}
        deleteIncome={incomesManagerClient.deleteIncome}
        />
      )}
    </>
  )
);
