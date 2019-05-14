import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@rmwc/button';

import { StoreProps } from '../../lib/interfaces';

interface ViewButtonProps {
  toggleShowItems: () => void;
}

@observer
export class ViewButton extends React.Component<ViewButtonProps, {}> {
  state = {
    text: 'ADD NEW ITEMS TO LIST'
  };

  handleClick = () => {
    this.setState({
      text:
        this.state.text === 'ADD NEW ITEMS TO LIST'
          ? 'SHOW ITEMS TO BUY ONLY'
          : 'ADD NEW ITEMS TO LIST'
    });
    this.props.toggleShowItems();
  };

  render() {
    return <Button onClick={this.handleClick}>{this.state.text}</Button>;
  }
}
