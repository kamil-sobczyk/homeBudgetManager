import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../../lib/interfaces';

import { Droppable } from 'react-beautiful-dnd';

import { FinishDialog } from '../../dialogs/finishDialog';
import { ProvidedSelected } from './provided/providedSelected';
import {StyledContainer} from '../items/items';

@observer
export class Selected extends React.Component<StoreProps, {}> {
  componentDidMount = () => {
    // getSelectedFromServer(this.props.getSelected);
  };

  render() {
    return (
      <StyledContainer>
        <Droppable droppableId='droppable'>
          {provided => <ProvidedSelected store={this.props.store} provided={provided}/>}
        </Droppable>
        <FinishDialog store={this.props.store}  />
      </StyledContainer>
    );
  }
}
