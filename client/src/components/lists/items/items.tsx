import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../lib/interfaces';

import { Button } from '@rmwc/button';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedItems } from './provided/providedItems';
import { StyledButtonsContainer } from '../../listBox/listsContainer';
import { IconButton } from '@rmwc/icon-button';
import { Icon } from '@rmwc/icon';
import '@rmwc/icon/icon.css';

interface ItemsProps {
  getItems: () => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  toggleShowDeleteItemDialog: (list: ListType, index: number) => void;
  toggleshowAddItemDialog: () => void;
  deleteItem: (index: number) => void;
  items: Item[];
  showdeleteItemDialog: boolean;
}

@observer
export class Items extends React.Component<ItemsProps, {}> {
  componentDidMount = () => {
    this.props.getItems();
  };
  render() {
    const {
      toggleShowEditDialog,
      toggleshowAddItemDialog,
      toggleShowDeleteItemDialog,
      items
    } = this.props;

    return (
      <StyledContainer>
        <Droppable droppableId='droppable2'>
          {providedDroppable2 => (
            <ProvidedItems
              toggleShowEditDialog={toggleShowEditDialog}
              toggleShowDeleteItemDialog={toggleShowDeleteItemDialog}
              items={items}
              provided={providedDroppable2}
            />
          )}
        </Droppable>
        <StyledButtonsContainer>
          <StyledIconButton
            onClick={toggleshowAddItemDialog}
            icon={{ icon: 'add_circle', size: 'xlarge' }}
          />
        </StyledButtonsContainer>
      </StyledContainer>
    );
  }
}

export const StyledContainer = styled.div`
  min-height: 300px;
  min-width: 150px;
  margin: 5px;
`;

export const StyledIconButton = styled(IconButton)`
  color: blue;
  margin-top: 20px;
  padding: 0;
`;
