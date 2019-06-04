import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Cost } from '../../../lib/interfaces';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { Legend } from 'recharts';

import { CostsCounter } from '../spendingsDialogs/spendingsTable/costsCounter';
import {
  StyledDialogTitle,
  StyledDialog
} from '../spendingsDialogs/spendingsDialog';
import { TableContainer } from '../spendingsDialogs/spendingsTable/tableContainer';

interface CalendarDialogDayProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  showFailSnackbar: boolean;
  datePicked: string | Date;
  setDatePicked: (date: Date) => string;
  getCosts?: () => void;
  costs: Cost[];
}

export class CalendarDialogDay extends React.Component<
  CalendarDialogDayProps,
  {}
> {
  componentDidMount = () => {
    if (this.props.getCosts) {
      this.props.getCosts();
    }
  };

  render() {
    const {
      costs,
      setVisibleDialog,
      visibleDialog,
      datePicked,
      setDatePicked
    } = this.props;
    let dayString: string = String(datePicked).replace(/\./g, '/');

    if (dayString[1] === '/') {
      dayString = `0${dayString}`;
    }
    dayString = dayString.slice(0, 10);

    const dayCosts = costs.filter((cost: Cost) =>
      cost.date.includes(dayString)
    );

    return (
      <StyledDialog
        open={visibleDialog.includes('Day')}
        aria-label='shopping-you-made'
      >
        <StyledDialogTitle>Spendings you made {dayString}</StyledDialogTitle>
        <Legend />
        <DialogContent>
          <TableContainer costs={dayCosts} />
          <CostsCounter costs={dayCosts} time={dayString} />
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            icon='add'
            onClick={() => setVisibleDialog('CalendarAddDayCostDialog')}
          />
          <Button onClick={() => setVisibleDialog('Calendar')} color='primary'>
            Close
          </Button>
        </DialogActions>
      </StyledDialog>
    );
  }
}
