import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';

import {
  DataTable,
  DataTableRow,
  DataTableBody,
  DataTableCell,
  DataTableHeadCell,
  DataTableContent,
  DataTableHead
} from '@rmwc/data-table';
import '@rmwc/data-table/data-table.css';
import { Income } from '../../../lib/interfaces';

export const generateRandomString = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

interface IncomesTableProps {
  getIncomes?: () => void;
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
}

@observer
export class IncomesTable extends React.Component<IncomesTableProps, {}> {
  componentDidMount = () => {
    if (this.props.getIncomes) {
      this.props.getIncomes();
    }
  };

  //   getCostItems = (cost: Cost): string | false =>
  //     cost.category === 'shopping'
  //       ? cost.chosenItems.length > 0
  //         ? cost.chosenItems.join(', ')
  //         : ' - - - '
  //       : cost.info
  //       ? cost.chosenItems.length > 0 && `${cost.chosenItems[0]} (${cost.info})`
  //       : cost.chosenItems.length > 0
  //       ? cost.chosenItems[0]
  //       : ' - - - ';

  handleIncomeClick = (income: Income) => {
    // const { setVisibleDialog, visibleDialog, setChosenCost } = this.props;
    // setVisibleDialog(`${visibleDialog}CostManager`);
    // setChosenCost(cost);
  };

  render() {
    // let displayedCosts: Cost[] = this.props.costs;

    // if (displayedCosts.length < 1) {
    //   displayedCosts = [
    //     {
    //       count: 0,
    //       chosenItems: [' - - - - - - '],
    //       date: ' - - - - - - ',
    //       category: 'shopping'
    //     }
    //   ];
    // }

    return (
      <StyledDataTable stickyRows={1}>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <StyledDataTableHeadCell>Item(s)</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Date</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Cost</StyledDataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <StyledDataTableRow>
              <StyledDataTableCell />
              <StyledDataTableCell>date</StyledDataTableCell>
              <StyledDataTableCell alignEnd>count</StyledDataTableCell>
            </StyledDataTableRow>
          </DataTableBody>
        </DataTableContent>
      </StyledDataTable>
    );
  }
}

const StyledDataTableCell = styled(DataTableCell)`
  text-align: center;
`;

const StyledDataTableHeadCell = styled(DataTableHeadCell)`
  text-align: center;
`;

const StyledDataTableRow = styled(DataTableRow)`
  cursor: pointer;
  border-top: 1px solid lightgrey;
`;

const StyledDataTable = styled(DataTable)`
  border: 1px solid lightgrey;
`;
