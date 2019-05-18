import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../lib/interfaces';

import { IconButton } from '@rmwc/icon-button';
import '@rmwc/icon/icon.css';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedItems } from './provided/providedItems';
import { StyledButtonsContainer } from '../../listBox/listsContainer';

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
          <StyledAddItemIconButton
            onClick={toggleshowAddItemDialog}
            icon={{ icon: 'add_circle', size: 'xlarge' }}
          />
        </StyledButtonsContainer>
      </StyledContainer>
    );
  }
}

export const StyledContainer = styled.div`
  min-height: 50px;
  min-width: 150px;
  margin: 5px;
`;

const StyledAddItemIconButton = styled(IconButton)`
  color: #4cad4f;
  margin-top: 15px;
  padding: 0;
`;
