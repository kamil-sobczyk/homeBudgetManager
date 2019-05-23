import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';

interface ViewButtonProps {
  toggleShowItems: () => void;
  showItems: boolean;
}

export const ViewButton = observer(
  ({ showItems, toggleShowItems }: ViewButtonProps) => (
    <Button onClick={toggleShowItems} theme='primary' outlined>
      {showItems ? 'SHOW ITEMS TO BUY ONLY' : 'ADD NEW ITEMS TO SHOPPING LIST'}
    </Button>
  )
);

