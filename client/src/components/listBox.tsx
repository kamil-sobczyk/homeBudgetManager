import * as React from "react";
import * as styled from "styled-components";
import { Store } from "../lib/App/store";
import { observer } from "mobx-react";


import { ListsContainer } from "./listsContainer";
import { AddDialog } from "./dialogs/addDialog";
import { EditDialog } from "./dialogs/editDialog";
import { DeleteDialog } from "./dialogs/deleteDialog";
import { ShoppingDialog } from "./dialogs/shoppingDialog";

export interface StoreProps {
  store: Store;
}

@observer
export class ListBox extends React.Component<StoreProps, {}> {
  render() {
    return (
      <>
        <ListsContainer {...this.props} />
        <AddDialog {...this.props} />
        <EditDialog {...this.props} />
        <DeleteDialog {...this.props} />
        <ShoppingDialog {...this.props} />
      </>
    );
  }
}
