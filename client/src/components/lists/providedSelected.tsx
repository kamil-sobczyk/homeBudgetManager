import * as React from 'react';
import styled from 'styled-components';
import { Store } from '../../lib/App/store';

import { observer } from 'mobx-react';

import { Item } from '../../lib/interfaces';

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

import { Checkbox } from '@rmwc/checkbox';

