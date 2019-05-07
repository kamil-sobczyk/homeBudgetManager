import * as React from "react";
import * as styled from "styled-components";
import { Store } from '../../lib/App/store'

import { Button } from "@rmwc/button";
import {Typography} from "@rmwc/typography";

import { Droppable } from "react-beautiful-dnd";

import { FinishDialog } from "../dialogs/finishDialog";
import { DraggableSelected } from "./draggableSelected";

interface SelectedProps {
    store: Store;
}

export class Selected extends React.Component<SelectedProps, {}> {
    render(){
        return null
    }
//   state = {
//     openFinish: false
//   };

//   componentDidMount = () => {
//     // getSelectedFromServer(this.props.getSelected);
//   };

//   handleToggle = (index: number) => () => {
//     const { selected, getSelected } = store;

//     selected[index].checked
//       ? (selected[index].checked = false)
//       : (selected[index].checked = true);
//     // getSelected(selected);
//     // changeSelectedOnServer(selected);
//   };

//   handleFinishShopping = () => {
//     this.setState({
//       openFinish: this.state.openFinish ? false : true
//     });
//   };
//   render() {
//     const {
//       classes,
//       handleToggleShowEditDialog,
//       selected,
//       display
//     } = this.props;
//     const { openFinish } = this.state;

//     return (
//       <>
//         <Droppable droppableId="droppable2">
//           {provided => (
//             <div
//               ref={provided.innerRef}
//               className={display ? classes.listSmall : classes.listBig}
//             >
//               <Typography use="subtitle1" gutterBottom>
//                 Items to buy
//               </Typography>
//               {selected.map((item, index) =>
//                 DraggableSelected(
//                   item,
//                   index,
//                   selected,
//                   classes,
//                   handleToggleShowEditDialog,
//                   this.handleToggle,
//                   classes.checkbox
//                 )
//               )}
//               {provided.placeholder}
//               <Button color="primary" onClick={this.handleFinishShopping}>
//                 Finish shopping
//               </Button>
//             </div>
//           )}
//         </Droppable>
//         <FinishDialog
//           openFinish={openFinish}
//           handleOpenFinish={this.handleFinishShopping.bind(this)}
//           selected={selected}
//         />
//       </>
//     );
//   }
}
