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

export class Navbar extends React.Component<{}, {}> {
    /*onClick = ():void => {
        console.log("btn pushed");
    }*/
    render(){
        return (<Button type={'primary'}>test</Button>)
    }

} 

//   const NabarContainer = styled.div`
//   flexGrow: 1`
