import * as React from 'react';

import { observer } from 'mobx-react';

import styled from 'styled-components';

import { ListType, Item } from '../../../lib/interfaces';

import { IconButton } from '@rmwc/icon-button';

import { SortingMenu } from '../sortingMenu';
import { getCategories } from './items';

interface ItemsTopButtonsProps {
  setVisibleDialog: (dialog?: string) => void;
  setChosenCategory: (list: ListType, category: string) => void;
  toggleSearchBar: () => void;
  updateList: () => void;
  items: Item[];
}

interface StyledListButtonsContainerProps {
  areItems?: boolean;
}

@observer
export class ItemsTopButtons extends React.Component<ItemsTopButtonsProps, {}> {
  categorizeItems = (category: string): void => {
    const { updateList, setChosenCategory } = this.props;

    setChosenCategory('items', category);
    updateList();
  };

  render() {
    const { setVisibleDialog, items, toggleSearchBar } = this.props;

    return (
      <StyledListButtonsContainer areItems>
        <StyledAddShoppingItemIconButton
          onClick={() => setVisibleDialog('AddShoppingItemDialog')}
          icon={{ icon: 'add_circle', size: 'large' }}
        />
        <StyledSearchButton
          icon={{ icon: 'search', size: 'large' }}
          onClick={() => toggleSearchBar()}
        />
        <SortingMenu
          categories={getCategories(items)}
          categorizeItems={this.categorizeItems}
        />
      </StyledListButtonsContainer>
    );
  }
}

const StyledAddShoppingItemIconButton = styled(IconButton)`
  color: #4cad4f;
  padding: 0;
`;

const StyledSearchButton = styled(IconButton)`
  padding: 0;
  color: darkblue;
`;

export const StyledListButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props: StyledListButtonsContainerProps) =>
    props.areItems ? 'flex-start' : 'flex-end'};
  align-items: center;
  width: 100%;
`;
