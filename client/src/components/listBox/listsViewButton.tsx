import * as React from 'react';

import { observer } from 'mobx-react';

import { IconButton } from 'rmwc';

interface ViewButtonProps {
  toggleShowItems: () => void;
  showItems: boolean;
}

export const ViewButton = observer(
  ({ showItems, toggleShowItems }: ViewButtonProps) => (
    <IconButton
      onClick={toggleShowItems}
      icon={showItems ? 'filter_1' : 'filter_2'}
    />
  )
);
