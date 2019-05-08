import * as React from 'react';

import { observer } from 'mobx-react';
import { Store } from '../../lib/App/store';

import styled from 'styled-components';
import { StyledItem } from './items';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import {
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListDivider
} from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import { Icon } from '@rmwc/icon';

import { Item } from '../../lib/interfaces';

import { Checkbox } from '@rmwc/checkbox';
