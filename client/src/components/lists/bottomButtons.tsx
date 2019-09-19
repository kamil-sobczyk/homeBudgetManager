import * as React from 'react';

import { observer } from 'mobx-react';

import styled from 'styled-components';

import { IconButton } from '@rmwc/icon-button';

interface ItemsBottomButtonsProps {
  setNextPage: () => void;
  setPrevPage: () => void;
  currentPage: number;
  areItems: boolean;
}

@observer
export class BottomButtons extends React.Component<
  ItemsBottomButtonsProps,
  {}
> {
  render() {
    const { setNextPage, setPrevPage, currentPage, areItems } = this.props;
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
  margin-top: '-45px';
`;
