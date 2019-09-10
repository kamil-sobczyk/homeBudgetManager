import * as React from 'react';
import {
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarNavigationIcon
} from '@rmwc/top-app-bar';
import styled from 'styled-components';
import { IconButton } from 'rmwc';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const usFlag = 'https://lipis.github.io/flag-icon-css/flags/4x3/um.svg';
const plFlag = 'https://lipis.github.io/flag-icon-css/flags/4x3/pl.svg';


interface NavbarSectionLeftProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => void;
  toggleLanguage: () => void;
}

@observer
export class NavbarSectionLeft extends React.Component<
  NavbarSectionLeftProps,
  {}
> {
  @observable flag = usFlag;

  handleChangeLang = () => {
    this.flag === usFlag ? (this.flag = plFlag) : (this.flag = usFlag);
    this.props.toggleLanguage();
  };

  render() {
    const { toggleShowDrawer, setVisibleDialog } = this.props;
    return (
      <TopAppBarSection alignStart>
        <TopAppBarNavigationIcon icon='menu' onClick={toggleShowDrawer} />
        <StyledTopAppBarTitle onClick={() => setVisibleDialog('AboutDialog')}>
          HBM
        </StyledTopAppBarTitle>
        <StyledLangSwitcher icon={this.flag} onClick={this.handleChangeLang} />
      </TopAppBarSection>
    );
  }
}

const StyledTopAppBarTitle = styled(TopAppBarTitle)`
  cursor: pointer;
`;

const StyledLangSwitcher = styled(IconButton)`
  margin-left: 15px;
`;
