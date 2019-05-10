import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from './listBox';

import styled from 'styled-components';

import { DragDropContext } from 'react-beautiful-dnd';

import { Button } from '@rmwc/button';

import { ViewButton } from './listsViewButton';
import { Items } from '../lists/items';
import { Selected } from '../lists/selected';

@observer
export class ListsContainer extends React.Component<StoreProps, {}> {
  componentDidMount = () => {
    this.props.store.apiClient.getItems();
    this.props.store.apiClient.getSelected();
  };
  render() {
    const {
      dndClient: { onDragEnd },
      visibilityClient: {
        showItems,
        toggleShowFinishDialog,
        toggleShowShoppingDialog
      }
    } = this.props.store;
    return (
      <>
        <StyledButtonsContainer>
          <ViewButton {...this.props} />
        </StyledButtonsContainer>
        <StyledListContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            {showItems && <Items {...this.props} />}
            <Selected {...this.props} />
          </DragDropContext>
        </StyledListContainer>
        <StyledButtonsContainer>
          <Button onClick={toggleShowShoppingDialog}>
            Show previous shoppings
          </Button>
          <Button color='primary' onClick={toggleShowFinishDialog}>
            Finish shopping
          </Button>
        </StyledButtonsContainer>
      </>
    );
  }
}

const StyledListContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;
