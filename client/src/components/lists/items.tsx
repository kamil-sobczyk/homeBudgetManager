import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../listBox';

import { Droppable } from 'react-beautiful-dnd';

import {ProvidedItems} from './providedItems';

@observer
export class Items extends React.Component<StoreProps, {}> {
  render() {
    return (
      <Droppable droppableId='droppable2'>
        {providedDroppable2 => <ProvidedItems store={this.props.store} providedDroppable2={providedDroppable2} />}
      </Droppable>
    );
  }
}

