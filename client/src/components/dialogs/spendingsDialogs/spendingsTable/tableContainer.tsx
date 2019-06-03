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

interface TableContainerProps {
  getCosts: () => void;
  costs: Cost[];
}

const getRowColor = (category: CategoryType) => {
  console.log(category)
  switch (category) {
    case 'shopping':
      return 'black';
    case 'bill':
      return 'black';
    case 'health':
      return 'black';
    case 'car':
      return 'black';
    default:
      return 'yellow';
  }
};

@observer
export class TableContainer extends React.Component<TableContainerProps, {}> {
  componentDidMount = () => {
    this.props.getCosts();
  };
  render() {
    const { costs } = this.props;
    let displayedCosts: Cost[] = costs;

    if (costs.length < 1) {
      displayedCosts = [
        {
          count: 0,
          chosenItems: [' - - - - - - '],
          date: ' - - - - - - ',
          category: 'bill'
        }
      ];
    }
    return (
      <StyledDataTable stickyRows={1}>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <StyledDataTableHeadCell>Items</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Date</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Cost</StyledDataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {displayedCosts.map((cost: Cost) => (
              <DataTableRow
                key={cost.date}
                style={{ color: getRowColor(cost.category) }}
              >
                <StyledDataTableCell>
                  {cost.category === 'shopping'
                    ? cost.chosenItems.join(', ')
                    : cost.info
                    ? cost.chosenItems[0] + ' (' + cost.info + ')'
                    : cost.chosenItems[0]}
                </StyledDataTableCell>
                <StyledDataTableCell>{cost.date}</StyledDataTableCell>
                <StyledDataTableCell alignEnd>
                  {cost.count + 'zł'}
                </StyledDataTableCell>
              </DataTableRow>
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
