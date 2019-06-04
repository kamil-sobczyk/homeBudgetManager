import * as React from 'react';

import { Cost } from '../../../lib/interfaces';

import { DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { CostsCounter } from '../spendingsDialogs/spendingsTable/costsCounter';
import {
  StyledDialogTitle,
  StyledDialog
} from '../spendingsDialogs/spendingsDialog';
import { TableContainer } from '../spendingsDialogs/spendingsTable/tableContainer';
import { Legend } from '../spendingsDialogs/spendingsTable/legend/legend';

interface CalendarDialogDayProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  showFailSnackbar: boolean;
  datePicked: string | Date;
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
    const { costs, setVisibleDialog, visibleDialog, datePicked } = this.props;
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
        </DialogContent>
        <CostsCounter costs={dayCosts} time={dayString} />
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
