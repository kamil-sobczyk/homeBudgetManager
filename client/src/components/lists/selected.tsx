import * as React from "react";
import * as styled from "styled-components";
import { Store } from "../../lib/App/store";

import { Item } from "../../lib/interfaces";

import { Button } from "@rmwc/button";
import { Typography } from "@rmwc/typography";
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

import { FinishDialog } from "../dialogs/finishDialog";

interface SelectedProps {
  store: Store;
}

export class Selected extends React.Component<SelectedProps, {}> {

  componentDidMount = () => {
    // getSelectedFromServer(this.props.getSelected);
  };

  handleToggle = (index: number) => () => {
    const { selected, getSelected } = this.props.store;

    selected[index].checked
      ? (selected[index].checked = false)
      : (selected[index].checked = true);
    // getSelected(selected);
    // changeSelectedOnServer(selected);
  };

  render() {
    const { toggleShowEditDialog, selected, showEditDialog, toggleShowFinishDialog } = this.props.store;

    return (
      <>
        <Droppable droppableId="droppable2">
          {provided => (
            <div
              ref={provided.innerRef}
              //   className={showEditDialog ? classes.listSmall : classes.listBig}
            >
              <Typography use="subtitle1">Items to buy</Typography>
              {selected.map((item, index) => {
                <Draggable key={index} draggableId={item.id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItem key={index} onClick={this.handleToggle(index)}>
                        <Checkbox
                          //   className={checkbox}
                          checked={
                            selected[index] ? selected[index].checked : false
                          }
                          //   tabIndex={-1}
                          //   value={"checked"}
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
                          onClick={toggleShowEditDialog({
                            list: "selected",
                            index: index
                          })}
                        >
                          <Icon icon="edit" />
                        </IconButton>
                      </ListItem>
                      <ListDivider />
                    </div>
                  )}
                </Draggable>;
              })}
              {provided.placeholder}
              <Button color="primary" onClick={toggleShowFinishDialog}>
                Finish shopping
              </Button>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
         <FinishDialog 
         store={this.props.store} 
       />
      </>
    );
  }
}
