import * as React from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Item } from "./../lib/interfaces";
import { observer } from "mobx-react";

import { ViewButton } from "./listsViewButton";
import { Items } from "./lists/items";
import { Selected } from "./lists/selected";
import { reorder, move, sortItemsByName } from "../functions/reorderFunctions";

import { Button } from "@rmwc/button";

import { Store } from "../lib/App/store";

interface ListsContainerProps {
  store: Store;
}

@observer
export class ListsContainer extends React.Component<ListsContainerProps, {}> {
  id2List = {
    droppable: "items",
    droppable2: "selected"
  };

  render() {
    const {
      onDragEnd,
      showItems,
      toggleShowFinishDialog,
      toggleShowShoppingDialog
    } = this.props.store;
    return (
      <>
        <StyledButtonsContainer>
          <ViewButton {...this.props} />
        </StyledButtonsContainer>
        <StyledListContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            {showItems ? <Items {...this.props} /> : false}
            <Selected {...this.props} />
          </DragDropContext>
        </StyledListContainer>
        <StyledButtonsContainer>
          <Button onClick={toggleShowShoppingDialog}>
            Show previous shoppings
          </Button>
          <Button color="primary" onClick={toggleShowFinishDialog}>
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
