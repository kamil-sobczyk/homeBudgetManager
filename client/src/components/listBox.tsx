import * as React from "react";
import * as styled from "styled-components";
import { Store } from "../lib/App/store";
import { observer } from "mobx-react";

import { ViewButton } from "./listsViewButton";
import { ListsContainer } from "./listsContainer";
import { AddDialog } from "./dialogs/addDialog";
import { EditDialog } from "./dialogs/editDialog";
import { DeleteDialog } from "./dialogs/deleteDialog";
import { ShoppingDialog } from "./dialogs/shoppingDialog";

interface ListBoxProps {
    store: Store;
}

@observer
export class ListBox extends React.Component<ListBoxProps, {}> {
  render() {
    return (
      <>
        <ViewButton {...this.props}/>
        <ListsContainer {...this.props}/>
        <AddDialog {...this.props}/>
        <EditDialog />
        <DeleteDialog />
        <ShoppingDialog />
      </>
    );
  }
}
