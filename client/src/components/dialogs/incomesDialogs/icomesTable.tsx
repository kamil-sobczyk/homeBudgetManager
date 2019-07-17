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
import {
  StyledDataTable,
  StyledDataTableHeadCell,
  StyledDataTableRow,
  StyledDataTableCell
} from '../expensesDialogs/spendingsTable/tableContainer';
import { Icon } from '@rmwc/icon';
import { StyledDeleteButton } from '../../lists/items/moreMenu';

export const generateRandomString = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

interface IncomesTableProps {
  deleteIncome: (income: Income) => void;
  setActiveIncome: (income: Income) => void;
  getIncomes: () => void;
  incomes: Income[];
  setVisibleDialog: (dialog?: string) => void;
  // visibleDialog: string;
}

@observer
export class IncomesTable extends React.Component<IncomesTableProps, {}> {
  componentDidMount = () => {
    this.props.getIncomes();
  };

  handleDeleteIncome = (income: Income) => {
    const { setVisibleDialog, setActiveIncome } = this.props;
    
    setVisibleDialog('DeleteIncomeDialog');
    setActiveIncome(income);
  };

  render() {
    return (
      <StyledDataTable stickyRows={1}>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <StyledDataTableHeadCell>Income</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Date</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Value</StyledDataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {this.props.incomes.map((income: Income, index: number) => (
              <StyledDataTableRow key={index}>
                <StyledDataTableCell>{income.category}</StyledDataTableCell>
                <StyledDataTableCell>{income.date}</StyledDataTableCell>
                <StyledDataTableCell alignEnd>
                  {income.count}zł
                </StyledDataTableCell>
                <td>
                  <StyledDeleteButton
                    icon='delete'
                    onClick={() => this.handleDeleteIncome(income)}
                  />
                </td>
              </StyledDataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </StyledDataTable>
    );
  }
}
