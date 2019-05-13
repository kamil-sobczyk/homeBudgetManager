import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { StoreProps } from '../../../lib/interfaces';

import { Button } from '@rmwc/button';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedItems } from './provided/providedItems';

@observer
export class Items extends React.Component<StoreProps, {}> {
  render() {
    return (
      <StyledContainer>
        <Droppable droppableId='droppable2'>
          {providedDroppable2 => (
            <ProvidedItems
              store={this.props.store}
              provided={providedDroppable2}
            />
          )}
        </Droppable>
        <Button onClick={this.props.store.visibilityClient.toggleShowAddDialog}>Add Item</Button>
      </StyledContainer>
    );
  }
}

export const StyledContainer = styled.div`
  min-height: 300px;
  min-width: 250px;
`;
