import * as React from "react";

import * as styled from "styled-components";

import { SimpleTopAppBar } from "@rmwc/top-app-bar";
import { TopAppBarFixedAdjust } from "@rmwc/top-app-bar";

export class Navbar extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <SimpleTopAppBar
          title="App Bar"
          navigationIcon={{ onClick: () => console.log("Navigate") }}
          actionItems={[
            { icon: "bookmark", onClick: () => console.log("Do Something") }
          ]}
        />
        <TopAppBarFixedAdjust />
      </>
    );
  }
}
