import * as React from "react";
import { Store } from "../../lib/App/store";

import * as styled from "styled-components";

import { Draggable, Droppable } from "react-beautiful-dnd";

import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListDivider
} from "@rmwc/list";
import { IconButton } from "@rmwc/icon-button";
import { Icon } from "@rmwc/icon";

import { Checkbox } from "@rmwc/checkbox";

interface ItemsProps {
  store: Store;
}

export class Items extends React.Component<ItemsProps, {}> {
  render() {
    const {
      toggleShowEditDialog,
      items,
      showEditDialog,
      toggleShowFinishDialog,
      toggleCheckItems
    } = this.props.store;
    return (
      <Droppable droppableId="droppable2">
        {providedDroppable2 => (
          <div ref={providedDroppable2.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {providedDraggable2 => (
                  <div>
                    <div
                      ref={providedDraggable2.innerRef}
                      {...providedDraggable2.draggableProps}
                      {...providedDraggable2.dragHandleProps}
                    >
                      <ListItem
                        key={index}
                        onClick={toggleCheckItems.bind(this, "items", index)}
                      >
                        <Checkbox
                          //   className={checkbox}
                          checked={items[index] ? items[index].checked : false}
                          tabIndex={-1}
                          value={"checked"}
                          //   disableRipple
                        />
                        <ListItemText>
                          <ListItemPrimaryText>{item.name}</ListItemPrimaryText>
                          <ListItemSecondaryText>
                            {item.info}
                          </ListItemSecondaryText>
                        </ListItemText>
                        <IconButton
                          aria-label="Edit item"
                          onClick={
                            toggleShowEditDialog.bind(this, "selected", index) ///////////////////////////
                          }
                        >
                          <Icon icon="edit" />
                        </IconButton>
                      </ListItem>
                    </div>
                    {providedDraggable2.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {providedDroppable2.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}
