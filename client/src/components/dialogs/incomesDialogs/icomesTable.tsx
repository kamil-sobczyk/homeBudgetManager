import * as React from 'react';

import { observer } from 'mobx-react';

import {
  DataTableRow,
  DataTableBody,
  DataTableContent,
  DataTableHead
} from '@rmwc/data-table';
import '@rmwc/data-table/data-table.css';
import { Income } from '../../../lib/interfaces';
import { StyledDataTable, StyledDataTableHeadCell, StyledDataTableRow, StyledDataTableCell } from '../expensesDialogs/spendingsTable/tableContainer';

export const generateRandomString = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

interface IncomesTableProps {
  // getIncomes?: () => void;
  // setVisibleDialog: (dialog?: string) => void;
  // visibleDialog: string;
}

@observer
export class IncomesTable extends React.Component<IncomesTableProps, {}> {
  // componentDidMount = () => {
  //   if (this.props.getIncomes) {
  //     this.props.getIncomes();
  //   }
  // };

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
    const incomes: Income[] = [
      { count: 22, category: 'salary', date: '01/02/2018' },
      { count: 32, category: 'gift', date: '02/03/2018' }
    ];
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
              <StyledDataTableHeadCell>Inocme</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Date</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Value</StyledDataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {incomes.map((income: Income, index: number) => (
              <StyledDataTableRow key={index}>
                <StyledDataTableCell>{income.category}</StyledDataTableCell>
                <StyledDataTableCell>{income.date}</StyledDataTableCell>
                <StyledDataTableCell alignEnd>{income.count}zł</StyledDataTableCell>
              </StyledDataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </StyledDataTable>
    );
  }
}
