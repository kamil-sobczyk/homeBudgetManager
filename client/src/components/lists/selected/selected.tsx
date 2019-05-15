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
  getSelected: () => void;
  selected: Item[];
}

@observer
export class Selected extends React.Component<SelectedProps, {}> {
  componentDidMount = () => {
    this.props.getSelected();
  };
  render() {
    const {
      setActiveItem,
      toggleCheckItems,
      toggleShowEditDialog,
      selected,
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
      </StyledContainer>
    );
  }
}
