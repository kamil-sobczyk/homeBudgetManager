import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';

import { IconButton } from '@rmwc/icon-button';
import { Droppable } from 'react-beautiful-dnd';

import { Item, ListType } from '../../../lib/interfaces';
import { ProvidedSelected } from './provided/providedSelected';
import { SelectedTopButtons } from './buttonsContainers/topButtons';

interface StyledContainerProps {
  showItems?: boolean;
}

interface SelectedProps {
  getSelected: () => void;
  toggleCheckItems: (list: ListType, id: string) => void;
  setActiveItem: (list: ListType, id: string) => void;
  setVisibleDialog: (dialog?: string) => void;
  getChosenCategory: (list: ListType) => string;
  setChosenCategory: (list: ListType, category: string) => void;
  areItemsEditable: boolean;
  showItems: boolean;
  selected: Item[];
}

@observer
export class Selected extends React.Component<SelectedProps, {}> {
  componentDidMount = () => {
    this.props.getSelected();
  };

  updateList = () => this.forceUpdate();

  getCategorizedItems = () => {
    const { selected, getChosenCategory } = this.props;
    if (getChosenCategory('selected') !== 'All') {
      return selected.filter(
        (item: Item) => item.category === getChosenCategory('selected')
      );
    } else {
      return selected;
    }
  };

  render() {
    const {
      setActiveItem,
      toggleCheckItems,
      setVisibleDialog,
      selected,
      areItemsEditable,
      setChosenCategory
    } = this.props;

    return (
      <StyledContainer showItems>
        <SelectedTopButtons
          setVisibleDialog={setVisibleDialog}
          selected={selected}
          setChosenCategory={setChosenCategory}
          updateList={this.updateList}
        />
        <StyledDroppable droppableId='droppable'>
          {provided => (
            <ProvidedSelected
              setActiveItem={setActiveItem}
              toggleCheckItems={toggleCheckItems}
              setVisibleDialog={setVisibleDialog}
              selected={this.getCategorizedItems()}
              provided={provided}
              areItemsEditable={areItemsEditable}
            />
          )}
        </StyledDroppable>
      </StyledContainer>
    );
  }
}

export const StyledContainer = styled.div`
  min-height: 400px;
  min-width: 150px;
  width: ${(props: StyledContainerProps) =>
    props.showItems ? '80vw' : '50vw'};
  margin: 5px;
`;

const StyledFinishShoppingButton = styled(IconButton)`
  color: #0d49aa;
  padding: 0;
`;

const StyledDroppable = styled(Droppable)`
  width: 100%;
`;
