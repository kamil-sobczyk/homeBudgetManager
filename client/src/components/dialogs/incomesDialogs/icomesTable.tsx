import * as React from 'react';

import styled from 'styled-components';
import { Income } from '../../../lib/interfaces';
import { observer } from 'mobx-react';

import {
  DataTableRow,
  DataTableBody,
  DataTableContent,
  DataTableHead
} from '@rmwc/data-table';
import '@rmwc/data-table/data-table.css';

import {
  StyledDataTable,
  StyledDataTableHeadCell,
  StyledDataTableRow,
  StyledDataTableCell
} from '../expensesDialogs/spendingsTable/tableContainer';
import { StyledDeleteButton } from '../../lists/items/moreMenu';

interface IncomesTableProps {
  deleteIncome: (income: Income) => void;
  setActiveIncome: (income: Income) => void;
  getIncomes: () => void;
  setVisibleDialog: (dialog?: string) => void;
  incomes: Income[];
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
    const sortedIncomes = this.props.incomes
      .slice()
      .sort((a: Income, b: Income): number => a.date.localeCompare(b.date))
      .reverse();

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
            {sortedIncomes.map((income: Income, index: number) => (
              <StyledDataTableRow key={index}>
                <StyledIncomeCell>{income.category}</StyledIncomeCell>
                <StyledIncomeCell>{income.date}</StyledIncomeCell>
                <StyledIncomeCell alignEnd>{income.count}zł</StyledIncomeCell>
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

const StyledIncomeCell = styled(StyledDataTableCell)`
  color: green;
`;
