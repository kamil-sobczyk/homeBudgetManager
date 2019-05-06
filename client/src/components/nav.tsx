import * as React from "react";

import * as styled from "styled-components";

import { Button } from "@rmwc/button";


import { SimpleTopAppBar } from "@rmwc/top-app-bar";
import { TopAppBarFixedAdjust } from "@rmwc/top-app-bar";



const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

export class Navbar extends React.Component {
    render(){
    return (<>
    <Button>"aaa"</Button>
  {/* <SimpleTopAppBar
    title="test"
    navigationIcon={{ onClick: () => console.log('Navigate') }}
    actionItems={[
      {
        icon: 'file_download',
        onClick: () => console.log('Do Something')
      },
      { icon: 'print', onClick: () => console.log('Do Something') },
      { icon: 'bookmark', onClick: () => console.log('Do Something') }
    ]}
  />
  <TopAppBarFixedAdjust />

  <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div> */}
</>)
    }

} 

//   const NabarContainer = styled.div`
//   flexGrow: 1`
