import * as React from 'react';

import { observer } from 'mobx-react';
import { AddItemDialog } from './addItemDialog';
import { EditDialog } from './editItemDialog';
import { DeleteItemDialog } from './deleteItemDialog';
import { SpendingsDialog } from './spendingsDialog/spendingsDialog';
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

        {visibilityClient.visibleDialog === 'FinishShoppingDialog' && (
          <FinishShoppingDialog
            setVisibleDialog={visibilityClient.setVisibleDialog}
            visibleDialog={visibilityClient.visibleDialog}
            changeCounter={shoppingClient.changeCounter}
            finishShopping={shoppingClient.finishShopping}
            count={shoppingClient.count}
          />
        )}
        {visibilityClient.visibleDialog === 'AddBillDialog' && (
          <AddBillDialog
            setVisibleDialog={visibilityClient.setVisibleDialog}
            visibleDialog={visibilityClient.visibleDialog}
            addBill={shoppingClient.addBill}
            changeNewBill={shoppingClient.changeBillName}
            changeCounter={shoppingClient.changeCounter}
            count={shoppingClient.count}
          />
        )}
        {visibilityClient.visibleDialog === 'FailDialog' && (
          <FailDialog
            setVisibleDialog={visibilityClient.setVisibleDialog}
            visibleDialog={visibilityClient.visibleDialog}
          />
        )}
      </>
    );
  }
}
