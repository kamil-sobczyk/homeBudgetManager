import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';

import { IconButton } from '@rmwc/icon-button';

import { SortingMenu } from '../sortingMenu';
import { ListType, Item } from '../../../lib/interfaces';
import { StyledListButtonsContainer } from '../items/topButtons';
import { getCategories } from '../items/items';

interface StyledButtonsContainerProps {
  showItems: boolean;
}

interface SelectedTopButtonsProps {
  setVisibleDialog: (dialog?: string) => void;
  setChosenCategory: (list: ListType, category: string) => void;
  updateList: () => void;
  showItems: boolean;
  selected: Item[];
}

@observer
export class SelectedTopButtons extends React.Component<
  SelectedTopButtonsProps,
  {}
> {
  categorizeItems = (category: string): void => {
    const { updateList, setChosenCategory } = this.props;

    setChosenCategory('selected', category);
    updateList();
  };

  render() {
    const { setVisibleDialog, selected, showItems } = this.props;
    return (
      <StyledButtonsContainer showItems={showItems}>
        <SelectedStyledListButtonsContainer>
          <StyledFinishShoppingButton
            onClick={() => setVisibleDialog('FinishShoppingDialog')}
            icon={{ icon: 'add_shopping_cart', size: 'large' }}
          />
          <SortingMenu
            categories={getCategories(selected)}
            categorizeItems={this.categorizeItems}
          />
        </SelectedStyledListButtonsContainer>
      </StyledButtonsContainer>
    );
  }
}

export const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: ${(props: StyledButtonsContainerProps) =>
    props.showItems ? 'center' : 'flex-start'};
`;

const StyledFinishShoppingButton = styled(IconButton)`
  color: #0d49aa;
  padding: 0;
`;

const SelectedStyledListButtonsContainer = styled(StyledListButtonsContainer)`
  display: flex;
  justify-content: center;
`;
