import * as React from 'react';

import { Cost } from '../../../lib/interfaces';

import { DialogActions } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { CostsCounter } from '../expensesDialogs/spendingsTable/costsCounter';
import {
  StyledDialogTitle,
  StyledDialog,
  StyledDialogContent
} from '../expensesDialogs/spendingsDialog';
import { TableContainer } from '../expensesDialogs/spendingsTable/tableContainer';
import { Legend } from '../expensesDialogs/spendingsTable/legend/legend';

interface CalendarDialogDayProps {
  setVisibleDialog: (dialog?: string) => void;
  setChosenCost: (cost: Cost) => Cost;
  visibleDialog: string;
  showFailSnackbar: boolean;
  datePicked: string | Date;
  costs: Cost[];
}

export class CalendarDialogDay extends React.Component<
  CalendarDialogDayProps,
  {}
> {
  render() {
    const {
      costs,
      setVisibleDialog,
      visibleDialog,
      datePicked,
      setChosenCost
    } = this.props;

    const dayCosts = costs.filter((cost: Cost) =>
      cost.date.includes(String(datePicked))
    );

    return (
      <StyledDialog
        open={visibleDialog.includes('Day')}
        aria-label='shopping-you-made'
      >
        <StyledDialogTitle>Spendings you made {datePicked}</StyledDialogTitle>
        <Legend />
        <StyledDialogContent>
          <TableContainer
            costs={dayCosts}
            setVisibleDialog={setVisibleDialog}
            visibleDialog={visibleDialog}
            setChosenCost={setChosenCost}
          />
        </StyledDialogContent>
        <CostsCounter costs={dayCosts} time={datePicked} />
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
