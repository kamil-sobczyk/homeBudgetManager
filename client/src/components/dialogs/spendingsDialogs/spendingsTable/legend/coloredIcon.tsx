import * as React from 'react';

import styled from 'styled-components';
import { Icon } from '@rmwc/icon';

interface ColoredIconProps {
  color: string;
}

export const ColoredIcon = (props: ColoredIconProps) => (
  <StyledColorIcon
    icon={
      <div
        style={{
          background: props.color,
          width: '10px',
          height: '10px',
          borderRadius: '50%'
        }}
      />
    }
  />
);

const StyledColorIcon = styled(Icon)`
  margin: 0 5px 0 25px;
`;
