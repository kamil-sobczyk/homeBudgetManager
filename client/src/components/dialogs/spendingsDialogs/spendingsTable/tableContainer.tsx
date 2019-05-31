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
  if (category === 'shopping') return 'black';
  else if (category === 'bill') return 'blue';
  else if (category === 'health') return 'green';
  else if (category === 'car') return 'red';
  else return 'yellow';
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
      <DataTable stickyRows={1}>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <StyledDataTableHeadCell>Items</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Date</StyledDataTableHeadCell>
              <StyledDataTableHeadCell>Cost</StyledDataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {displayedCosts.map((cost: Cost, index: number) => (
              <DataTableRow
                key={index}
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
      </DataTable>
    );
  }
}

const StyledDataTableCell = styled(DataTableCell)`
  text-align: center;
  /* display: flex; */
  /* flex-grow: 3; */
/*  
  width: 20%; */
`;

const StyledDataTableHeadCell = styled(DataTableHeadCell)`
  text-align: center;
  /* width: 20%; */

`;

