import * as React from 'react';

import { observer } from 'mobx-react';
import { Item, ListType, Cost } from '../../../lib/interfaces';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedSelected } from './provided/providedSelected';
import { StyledContainer } from '../items/items';
import { StyledButtonsContainer } from '../../listBox/listsContainer';
import { IconButton } from '@rmwc/icon-button';
import styled from 'styled-components';

interface SelectedProps {
  getSelected: () => void;
  toggleCheckItems: (list: ListType, index: number) => void;
  setActiveItem: (list: ListType, index: number) => void;
  setVisibleDialog: (dialog?: string) => void;
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
      selected,
      setVisibleDialog
    } = this.props;

    return (
      <StyledContainer>
        <StyledButtonsContainer>
          <StyledFinishShoppingButton
            onClick={() => setVisibleDialog('FinishShoppingDialog')}
            icon={{ icon: 'add_shopping_cart', size: 'xlarge' }}
          />
        </StyledButtonsContainer>
        <Droppable droppableId='droppable'>
          {provided => (
            <ProvidedSelected
              setActiveItem={setActiveItem}
              toggleCheckItems={toggleCheckItems}
              setVisibleDialog={setVisibleDialog}
              selected={selected}
              provided={provided}
            />
          )}
        </Droppable>
      </StyledContainer>
    );
  }
}

const StyledFinishShoppingButton = styled(IconButton)`
  color: #0d49aa;
  padding: 0;
`;
