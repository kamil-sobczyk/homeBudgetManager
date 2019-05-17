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

import { CostsCounter } from './costsCounter';

interface TableContainerProps {
  getCosts: () => void;
  costs: Cost[];
}

@observer
export class TableContainer extends React.Component<TableContainerProps, {}> {
  componentDidMount = (): void => {
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
          date: ' - - - - - - '
        }
      ];
    }

    return (
      <>
        <StyledDataTable>
          <StyledDataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Items</DataTableHeadCell>
                <DataTableHeadCell>Date</DataTableHeadCell>
                <DataTableHeadCell alignEnd>Cost</DataTableHeadCell>
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
        <CostsCounter displayedCosts={displayedCosts} />
      </>
    );
  }
}

const StyledDataTableContent = styled(DataTableContent)`
  width: 100%;
`;

const StyledDataTableCell = styled(DataTableCell)`
  text-align: center;
`;

const StyledDataTable = styled(DataTable)`
  min-width: 300px;
  min-height: 400px;
`;
