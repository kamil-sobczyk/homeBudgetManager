import * as React from 'react';

import { observer } from 'mobx-react';
import { AddItemDialog } from './addItemDialog';
import { EditDialog } from './editItemDialog';
import { DeleteItemDialog } from './deleteItemDialog';
import { SpendingsDialog } from './spendingsDialog';
import { FinishShoppingDialog } from './finishShoppingDialog';
import { Cost, Item } from '../../lib/interfaces';
import { Store } from '../../lib/mobx/rootStore';
import { FailDialog } from './failDialog';
import { AddBillDialog } from './addBillDialog';

interface DialogsContainerProps {
  items: Item[];
  selected: Item[];
  costs: Cost[];
  visibilityClient: Store['visibilityClient'];
  itemMenagerClient: Store['itemMenagerClient'];
  apiClient: Store['apiClient'];
  shoppingClient: Store['shoppingClient'];
}

@observer
export class DialogsContainer extends React.Component<
  DialogsContainerProps,
  {}
> {
  render() {
    const {
      costs,
      items,
      selected,
      visibilityClient,
      itemMenagerClient,
      apiClient,
      shoppingClient
    } = this.props;

    return (
      <>
        {visibilityClient.showAddItemDialog && (
          <AddItemDialog
            items={items}
            selected={selected}
            toggleshowAddItemDialog={visibilityClient.toggleshowAddItemDialog}
            showAddItemDialog={visibilityClient.showAddItemDialog}
            addItem={itemMenagerClient.addItem}
            changeNewItem={itemMenagerClient.changeNewItem}
          />
        )}

        {visibilityClient.showEditDialog && (
          <EditDialog
            toggleShowFailDialog={visibilityClient.toggleShowFailDialog}
            name={itemMenagerClient.currentItemName}
            info={itemMenagerClient.currentItemInfo}
            onChangeName={itemMenagerClient.updateCurrentItemName}
            onChangeInfo={itemMenagerClient.updateCurrentItemInfo}
            isVisible={visibilityClient.showEditDialog}
            hide={visibilityClient.toggleShowEditDialog}
          />
        )}

        {visibilityClient.showdeleteItemDialog && (
          <DeleteItemDialog
            items={items}
            toggleShowdeleteItemDialog={
              visibilityClient.toggleShowDeleteItemDialog
            }
            deleteItem={itemMenagerClient.deleteItem}
            list={itemMenagerClient.activeItem.list}
            index={itemMenagerClient.activeItem.index}
            showdeleteItemDialog={visibilityClient.showdeleteItemDialog}
          />
        )}

        {visibilityClient.showSpendingsDialog && (
          <SpendingsDialog
            getCosts={apiClient.getCosts}
            costs={costs}
            toggleShowSpendingsDialog={
              visibilityClient.toggleShowSpendingsDialog
            }
            showSpendingsDialog={visibilityClient.showSpendingsDialog}
          />
        )}

        {visibilityClient.showFinish && (
          <FinishShoppingDialog
            items={items}
            selected={selected}
            toggleShowFinishShoppingDialog={
              visibilityClient.toggleShowFinishShoppingDialog
            }
            reorderItems={itemMenagerClient.reorderItems}
            showFinish={visibilityClient.showFinish}
            showAddItemDialog={visibilityClient.showAddItemDialog}
            changeCounter={shoppingClient.changeCounter}
            finishShopping={shoppingClient.finishShopping}
            count={shoppingClient.count}
          />
        )}
        {visibilityClient.showFailDialog && (
          <FailDialog
            showFailDialog={visibilityClient.showFailDialog}
            toggleShowFailDialog={visibilityClient.toggleShowFailDialog}
          />
        )}
        {visibilityClient.showAddBillDialog && (
          <AddBillDialog
            toggleShowAddBillDialog={visibilityClient.toggleShowAddBillDialog}
            addBill={itemMenagerClient.addItem}
            changeNewBill={itemMenagerClient.changeNewItem}
            showAddBillDialog={visibilityClient.showAddBillDialog}
          />
        )}
      </>
    );
  }
}
