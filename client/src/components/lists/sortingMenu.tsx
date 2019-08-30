import * as React from 'react';

import styled from 'styled-components';

import { SimpleMenu, MenuItem } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { Button } from '@rmwc/button';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

// import { ListType } from '../../../lib/interfaces';

interface SortingMenuProps {
  categories: string[];
  // setVisibleDialog: (dialog?: string) => void;
  // setActiveItem: (list: ListType, index: number) => void;
  // index: number;
}

@observer
export class SortingMenu extends React.Component<SortingMenuProps, {}> {
  @observable buttonText = 'category';

  handleOptionClick = (category: string): any => {
    this.buttonText = category;
  };

  render() {
    const { categories } = this.props;

    const menuItems = categories.map((category: string) => (
      <React.Fragment key={category}>
        <MenuItem onClick={() => this.handleOptionClick(category)}>
          {category}
        </MenuItem>
        <ListDivider />
      </React.Fragment>
    ));

    return (
      <SimpleMenu
        handle={<Button>{this.buttonText}</Button>}
        hoistToBody={true}
      >
        {menuItems}
      </SimpleMenu>
    );
  }
}
