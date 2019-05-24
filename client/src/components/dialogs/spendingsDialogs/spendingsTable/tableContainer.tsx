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
  if (category === 'shopping') return 'red';
  else if (category === 'bill') return 'blue';
  else return 'green';
};

@observer
export class TableContainer extends React.Component<TableContainerProps, {}> {
  componentDidMount = () => {
    this.props.getCosts();
  };
  render() {
    const { costs, getCosts } = this.props;

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
        <StyledDataTableContent>
          <DataTableHead>
            <DataTableRow>
              <StyledDataTableHeadCell>Items</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Date</StyledDataTableHeadCell>
              <StyledDataTableHeadCell alignEnd>Cost</StyledDataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {displayedCosts.map((cost: Cost, index: number) => {
              console.log(JSON.stringify(displayedCosts));
              return (
                <DataTableRow
                  key={index}
                  style={{ color: getRowColor(cost.category) }}
                >
                  <StyledDataTableCell>
                    {cost.chosenItems.join(', ')}
                  </StyledDataTableCell>
                  <StyledDataTableCell>{cost.date}</StyledDataTableCell>
                  <StyledDataTableCell alignEnd>
                    {cost.count + 'zł'}
                  </StyledDataTableCell>
                </DataTableRow>
              );
            })}
          </DataTableBody>
        </StyledDataTableContent>
      </StyledDataTable>
    );
  }
}

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
