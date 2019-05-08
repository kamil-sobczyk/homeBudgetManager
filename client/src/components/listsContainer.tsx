import * as React from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Item } from "./../lib/interfaces";
import { observer } from "mobx-react";

import { Items } from "./lists/items";
import { Selected } from "./lists/selected";
import { reorder, move, sortItemsByName } from "../functions/reorderFunctions";

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
    const { onDragEnd, showItems } = this.props.store;
    return (
      <StyledListContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {showItems ? <Items {...this.props} /> : false}
          <Selected {...this.props} />
        </DragDropContext>
      </StyledListContainer>
    );
  }
}

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
