import * as React from 'react';
import styled from 'styled-components';
// import {LinearProgress} from '@rmwc/LinearProgress';
import {observer} from 'mobx-react';

interface ProgressBarProps {
  vh100?: boolean;
  style?: React.CSSProperties;
}
export const ProgressBar = observer((props: ProgressBarProps) => (<></>
  // <LoaderBox
  //   style={props.style}
  //   vh100={props.vh100}
  // >
  //   <LoaderWrapper>
  //     <LinearProgress determinate={false} />
  //   </LoaderWrapper>
  // </LoaderBox>
));

// const LoaderWrapper = styled.div`
//   position: absolute;
//   z-index: 10; 
//   left: 25%;
//   top: calc(50% - 2px);
//   width: 50%;
//   height: 4px;
// `;

// interface LoaderBoxProps {
//   vh100?: boolean;
// }
// const LoaderBox = styled.div`
//   position: absolute; 
//   width: 100%;
//   height: ${(props: LoaderBoxProps) => (props.vh100 ? 'calc(var(--vh, 1vh) * 100)' : '100%')};
//   background-color: rgba(255,255,255,0.4);
//   z-index: 30;
//   top: 0;
// `;
