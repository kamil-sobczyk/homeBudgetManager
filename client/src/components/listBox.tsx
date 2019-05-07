import * as React from "react";

import * as styled from "styled-components";

import { ViewButton } from "./listsViewButton";
import { ListsContainer } from "./listsContainer";
import { AddDialog } from "./dialogs/addDialog";
import { EditDialog } from "./dialogs/editDialog";
import { DeleteDialog } from "./dialogs/deleteDialog";
import { ShoppingDialog } from "./dialogs/shoppingDialog";

export class ListBox extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <ViewButton />
        <ListsContainer />
        <AddDialog />
        <EditDialog />
        <DeleteDialog />
        <ShoppingDialog />
      </>
    );
  }
}
