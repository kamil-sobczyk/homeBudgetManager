import * as React from 'react';

import { observer } from 'mobx-react';

import styled from 'styled-components';

import { ListType, Item } from '../../../../lib/interfaces';

import { IconButton } from '@rmwc/icon-button';

import { StyledListButtonsContainer, getCategories } from '../../items/items';
import { StyledButtonsContainer } from '../../../listBox/listsContainer';

interface ItemsBottomButtonsProps {
  setNextPage: () => void;
  setPrevPage: () => void;
  currentPage: number;
}

@observer
export class ItemsBottomButtons extends React.Component<
  ItemsBottomButtonsProps,
  {}
> {
  render() {
    const { setNextPage, setPrevPage, currentPage } = this.props;
    return (
      <StyledPaginationContainer>
        <IconButton icon='navigate_before' onClick={setPrevPage} />
        <span>{currentPage}</span>
        <IconButton icon='navigate_next' onClick={setNextPage} />
      </StyledPaginationContainer>
    );
  }
}

export const StyledPaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: -45px;
`;
