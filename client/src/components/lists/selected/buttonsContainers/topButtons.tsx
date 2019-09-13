import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';

import { IconButton } from '@rmwc/icon-button';

import { StyledListButtonsContainer, getCategories } from '../../items/items';
import { StyledButtonsContainer } from '../../../listBox/listsContainer';
import { SortingMenu } from '../../sortingMenu';
import { ListType, Item } from '../../../../lib/interfaces';

interface SelectedTopButtonsProps {
    setVisibleDialog: (dialog?: string) => void;
    setChosenCategory: (list: ListType, category: string) => void;
    selected: Item[];
}

@observer
export class SelectedTopButtons extends React.Component<any, {}> {
  categorizeItems = (category: string): void => {
    this.props.setChosenCategory('selected', category);
    this.forceUpdate();
  };

  render() {
    const { setVisibleDialog, selected } = this.props;
    return (
      <StyledButtonsContainer>
        <StyledListButtonsContainer>
          <StyledFinishShoppingButton
            onClick={() => setVisibleDialog('FinishShoppingDialog')}
            icon={{ icon: 'add_shopping_cart', size: 'xlarge' }}
          />
          <SortingMenu
            categories={getCategories(selected)}
            categorizeItems={this.categorizeItems}
          />
        </StyledListButtonsContainer>
      </StyledButtonsContainer>
    );
  }
}

const StyledFinishShoppingButton = styled(IconButton)`
  color: #0d49aa;
  padding: 0;
`;
