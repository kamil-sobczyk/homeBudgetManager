import * as React from 'react';

import { observer } from 'mobx-react';
import { AddDialog } from './addDialog';
import { EditDialog } from './editDialog';
import { DeleteDialog } from './deleteDialog';
import { ShoppingDialog } from './shoppingDialog';
import { FinishDialog } from './finishDialog';
import { Cost, Item } from '../../lib/interfaces';
import { Store } from '../../lib/mobx/rootStore';
import { FailDialog } from './failDialog';

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
        {visibilityClient.showAddDialog && (
          <AddDialog
            items={items}
            selected={selected}
            toggleShowAddDialog={visibilityClient.toggleShowAddDialog}
            showAddDialog={visibilityClient.showAddDialog}
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

        {visibilityClient.showDeleteDialog && (
          <DeleteDialog
            items={items}
            toggleShowDeleteDialog={visibilityClient.toggleShowDeleteDialog}
            deleteItem={itemMenagerClient.deleteItem}
            list={itemMenagerClient.activeItem.list}
            index={itemMenagerClient.activeItem.index}
            showDeleteDialog={visibilityClient.showDeleteDialog}
          />
        )}

        {visibilityClient.showShoppingDialog && (
          <ShoppingDialog
            getCosts={apiClient.getCosts}
            costs={costs}
            toggleShowShoppingDialog={visibilityClient.toggleShowShoppingDialog}
            showShoppingDialog={visibilityClient.showShoppingDialog}
          />
        )}

        {visibilityClient.showFinish && (
          <FinishDialog
            items={items}
            selected={selected}
            toggleShowFinishDialog={visibilityClient.toggleShowFinishDialog}
            reorderItems={itemMenagerClient.reorderItems}
            showFinish={visibilityClient.showFinish}
            showAddDialog={visibilityClient.showAddDialog}
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
      </>
    );
  }
}
