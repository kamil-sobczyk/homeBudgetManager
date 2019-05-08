import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../listBox';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import {
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListDivider
} from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import { Icon } from '@rmwc/icon';
import { Checkbox } from '@rmwc/checkbox';

import { FinishDialog } from '../dialogs/finishDialog';
import { ProvidedSelected } from './providedSelected';
import { StyledItem } from './items';

interface Provided {
  store: StoreProps;
  provided: any;
}

@observer
export class Selected extends React.Component<StoreProps, {}> {
  componentDidMount = () => {
    // getSelectedFromServer(this.props.getSelected);
  };

  render() {
    const {
      toggleShowEditDialog,
      selected,
      showEditDialog,
      toggleShowFinishDialog,
      toggleCheckItems
    } = this.props.store;

    const list = 'selected';

    // console.log(JSON.parse(selected));

    return (
      <>
        <Droppable droppableId='droppable'>
          {provided => <ProvidedSelected store={this.props.store} provided={provided}/>}
        </Droppable>
        <FinishDialog store={this.props.store}  />
      </>
    );
  }
}
