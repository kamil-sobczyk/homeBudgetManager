import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';

interface ViewButtonProps {
  toggleShowItems: () => void;
  showItems: boolean;
}

@observer
export class ViewButton extends React.Component<ViewButtonProps, {}> {
  render() {
    const { showItems, toggleShowItems } = this.props;
    return (
      <Button onClick={() => toggleShowItems()}>
        {showItems ? 'SHOW ITEMS TO BUY ONLY' : 'ADD NEW ITEMS TO LIST'}
      </Button>
    );
  }
}
