import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';

import { Droppable } from 'react-beautiful-dnd';

import { Item, ListType } from '../../../lib/interfaces';
import { ProvidedSelected } from './provided/providedSelected';
import { SelectedTopButtons } from './topButtons';
import { PagesManagerClient } from '../../../lib/mobx/stores/pagesManagerClient';
import { BottomButtons } from '../bottomButtons';

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
  pagesManager: PagesManagerClient;
}

@observer
export class Selected extends React.Component<SelectedProps, {}> {
  list: ListType = 'selected';

  componentDidMount = () => {
    this.props.pagesManager.setMaxPage(this.list, this.props.selected);
    this.props.getSelected();
  };

  updateList = () => this.forceUpdate();

  getCategorizedItems = () => {
    const { selected, getChosenCategory, pagesManager } = this.props;
    const startIndex = (pagesManager.getChosenPage(this.list) - 1) * 10;

    if (getChosenCategory(this.list) !== 'All') {
      const filteredItems = selected.filter(
        (item: Item) => item.category === getChosenCategory(this.list)
      );
      pagesManager.setMaxPage(this.list, filteredItems);
      return this.paginateItems(filteredItems, startIndex);
    } else {
      return this.paginateItems(selected, startIndex);
    }
  };

  setNextPage = (): void => {
    const { setNextPage, getChosenPage, getMaxPage } = this.props.pagesManager;

    getChosenPage(this.list) <= getMaxPage(this.list)
      ? setNextPage(this.list)
      : null;

    this.updateList();
  };

  setPrevPage = (): void => {
    this.props.pagesManager.setPrevPage(this.list);
    this.updateList();
  };

  paginateItems = (items: Item[], startIndex: number): Item[] => {
    this.props.pagesManager.setMaxPage(this.list, items);

    return items.slice(startIndex, startIndex + 10);
  };

  render() {
    const {
      setActiveItem,
      toggleCheckItems,
      setVisibleDialog,
      selected,
      areItemsEditable,
      setChosenCategory,
      pagesManager
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
        <BottomButtons
          setNextPage={this.setNextPage}
          setPrevPage={this.setPrevPage}
          currentPage={pagesManager.getChosenPage(this.list)}
        />
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

const StyledDroppable = styled(Droppable)`
  width: 100%;
`;
