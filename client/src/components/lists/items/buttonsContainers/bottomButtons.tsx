import * as React from 'react';

import { observer } from 'mobx-react';

import styled from 'styled-components';

import { ListType, Item } from '../../../../lib/interfaces';

import { IconButton } from '@rmwc/icon-button';

import { StyledListButtonsContainer, getCategories } from '../../items/items';
import { StyledButtonsContainer } from '../../../listBox/listsContainer';

interface ItemsBottomButtonsProps {}

@observer
export class ItemsBottomButtons extends React.Component<
  ItemsBottomButtonsProps,
  {}
> {
  render() {
    return (
      <StyledPaginationContainer>
        <IconButton icon='navigate_before' />
        <IconButton icon='navigate_next' />
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
`;
