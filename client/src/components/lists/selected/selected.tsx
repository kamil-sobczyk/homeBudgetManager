import * as React from 'react';

import { observer } from 'mobx-react';
import { Item, ListType, Cost } from '../../../lib/interfaces';

import { Droppable } from 'react-beautiful-dnd';

import { FinishDialog } from '../../dialogs/finishDialog';
import { ProvidedSelected } from './provided/providedSelected';
import { StyledContainer } from '../items/items';

interface SelectedProps {
  setActiveItem: (list: ListType, index: number) => void;
  toggleCheckItems: (list: ListType, index: number) => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  reorderItems: (newItems: Item[], newSelected: Item[]) => void;
  toggleShowFinishDialog: (cost: Cost) => void;
  showFinish: boolean;
  items: Item[];
  selected: Item[];
  showAddDialog: boolean;
}

@observer
export class Selected extends React.Component<SelectedProps, {}> {
  render() {
    const {
      setActiveItem,
      toggleCheckItems,
      toggleShowEditDialog,
      selected,
      reorderItems,
      toggleShowFinishDialog,
      showFinish,
      items,
      showAddDialog
    } = this.props;

    return (
      <StyledContainer>
        <Droppable droppableId='droppable'>
          {provided => (
            <ProvidedSelected
              setActiveItem={setActiveItem}
              toggleCheckItems={toggleCheckItems}
              toggleShowEditDialog={toggleShowEditDialog}
              selected={selected}
              provided={provided}
            />
          )}
        </Droppable>
        <FinishDialog
          reorderItems={reorderItems}
          toggleShowFinishDialog={toggleShowFinishDialog}
          showFinish={showFinish}
          items={items}
          selected={selected}
          showAddDialog={showAddDialog}
        />
      </StyledContainer>
    );
  }
}
