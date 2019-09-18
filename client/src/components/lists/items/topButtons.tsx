import * as React from 'react';

import { observer } from 'mobx-react';

import styled from 'styled-components';

import { ListType, Item } from '../../../lib/interfaces';

import { IconButton } from '@rmwc/icon-button';

import { StyledListButtonsContainer, getCategories } from './items';
import { SortingMenu } from '../sortingMenu';

interface ItemsTopButtonsProps {
  setVisibleDialog: (dialog?: string) => void;
  setChosenCategory: (list: ListType, category: string) => void;
  toggleSearchBar: () => void;
  items: Item[];
  updateList: () => void;
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
        <StyledListButtonsContainer>
          <StyledAddShoppingItemIconButton
            onClick={() => setVisibleDialog('AddShoppingItemDialog')}
            icon={{ icon: 'add_circle', size: 'xlarge' }}
          />
          <StyledSearchButton
            icon={{ icon: 'search', size: 'xlarge' }}
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
