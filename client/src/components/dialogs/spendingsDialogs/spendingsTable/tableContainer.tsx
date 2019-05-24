import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Cost } from '../../../../lib/interfaces';

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

export const TableContainer = observer(
  ({ costs, getCosts }: TableContainerProps) => {
    getCosts();

    let displayedCosts: Cost[] = costs;
    if (costs.length < 1) {
      displayedCosts = [
        {
          count: 0,
          chosenItems: [' - - - - - - '],
          date: ' - - - - - - '
        }
      ];
    }

    return (
      <StyledDataTable stickyRows={1}>
        <StyledDataTableContent>
          <DataTableHead>
            <DataTableRow>
              <StyledDataTableHeadCell>Items</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Date</StyledDataTableHeadCell>
              <StyledDataTableHeadCell alignEnd>Cost</StyledDataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {displayedCosts.map((cost: Cost, index: number) => (
              <DataTableRow
                key={index}
                style={cost.bill ? { color: 'blue' } : { color: 'green' }}
              >
                <StyledDataTableCell>
                  {cost.chosenItems.join(', ')}
                </StyledDataTableCell>
                <StyledDataTableCell>{cost.date}</StyledDataTableCell>
                <StyledDataTableCell alignEnd>
                  {cost.count + 'zł'}
                </StyledDataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </StyledDataTableContent>
      </StyledDataTable>
    );
  }
);

const StyledDataTableContent = styled(DataTableContent)`
  width: 100%;
`;

const StyledDataTableCell = styled(DataTableCell)`
  text-align: center;
`;

const StyledDataTableHeadCell = styled(DataTableHeadCell)`
  text-align: center;
`;

const StyledDataTable = styled(DataTable)`
  width: 400px;
  height: 500px;
  overflow: hidden;
`;
