import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';

import { Cost, CategoryType } from '../../../../lib/interfaces';

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

const getRowColor = (category: CategoryType) => {
  if (category === 'shopping') return 'black';
  else if (category === 'bill') return 'blue';
  else if (category === 'health') return 'green';
  else if (category === 'car') return 'red';
  else return 'yellow';
};

export const generateRandomString = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

interface TableContainerProps {
  getCosts?: () => void;
  costs: Cost[];
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  setChosenCost: (cost: Cost) => Cost;
}

@observer
export class TableContainer extends React.Component<TableContainerProps, {}> {
  componentDidMount = () => {
    if (this.props.getCosts) {
      this.props.getCosts();
    }
  };

  getCostItems = (cost: Cost): string | false =>
    cost.category === 'shopping'
      ? cost.chosenItems.length > 0
        ? cost.chosenItems.join(', ')
        : ' - - - '
      : cost.info
      ? cost.chosenItems.length > 0 && `${cost.chosenItems[0]} (${cost.info})`
      : cost.chosenItems.length > 0
      ? cost.chosenItems[0]
      : ' - - - ';

  handleCostClick = (cost: Cost) => {
    const { setVisibleDialog, visibleDialog, setChosenCost } = this.props;

    setVisibleDialog(`${visibleDialog}CostManager`);
    setChosenCost(cost);

    console.log(JSON.stringify(cost));
  };

  render() {
    let displayedCosts: Cost[] = this.props.costs;

    if (displayedCosts.length < 1) {
      displayedCosts = [
        {
          count: 0,
          chosenItems: [' - - - - - - '],
          date: ' - - - - - - ',
          category: 'shopping'
        }
      ];
    }

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
            {displayedCosts.map((cost: Cost) => (
              <StyledDataTableRow
                key={generateRandomString()}
                style={{ color: getRowColor(cost.category) }}
                onClick={() => this.handleCostClick(cost)}
              >
                <StyledDataTableCell>
                  {this.getCostItems(cost)}
                </StyledDataTableCell>
                <StyledDataTableCell>{cost.date}</StyledDataTableCell>
                <StyledDataTableCell alignEnd>
                  {`${cost.count}zł`}
                </StyledDataTableCell>
              </StyledDataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </StyledDataTable>
    );
  }
}

const StyledDataTableCell = styled(DataTableCell)`
  text-align: center;
  border-top: 1px solid grey;
`;

const StyledDataTableHeadCell = styled(DataTableHeadCell)`
  text-align: center;
`;

const StyledDataTable = styled(DataTable)`
  margin: 10px 0 0 -10px;
`;

const StyledDataTableRow = styled(DataTableRow)`
  cursor: pointer;
`;
