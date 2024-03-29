import * as React from 'react';

import { SimpleMenu, MenuItem } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { Button } from '@rmwc/button';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

interface SortingMenuProps {
  categories: string[];
  categorizeItems: (category: string) => void;
}

@observer
export class SortingMenu extends React.Component<SortingMenuProps, {}> {
  @observable private buttonText = 'category';

  private handleOptionClick = (category: string): void => {
    this.buttonText = category;
    this.props.categorizeItems(category);
  };

  render() {
    const menuItems = this.props.categories.sort().map((category: string) => (
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
