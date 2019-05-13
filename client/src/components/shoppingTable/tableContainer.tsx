import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Store } from '../../lib/mobx/rootStore';
import { Cost } from '../../lib/interfaces';

import {
  DataTable,
  DataTableRow,
  DataTableBody,
  DataTableCell,
  DataTableHeadCell,
  DataTableContent,
  DataTableHead
} from '@rmwc/data-table';

// import Pagination from "./tablePagination";
import { CostsCard } from './costsCard';

interface TableContainerProps {
  store: Store;
}

interface TableContainerState {
  page: number;
  rowsPerPage: number;
  costs: Cost[];
}

@observer
export class TableContainer extends React.Component<
  TableContainerProps,
  TableContainerState
> {
  state = {
    page: 0,
    rowsPerPage: 5,
    costs: []
  };

  componentDidMount = (): void => {
    this.props.store.apiClient.getCosts();
  };

  handleChangePage = (
    event: React.FormEvent<EventTarget>,
    page: number
  ): void => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    this.setState({ page: 0, rowsPerPage: parseInt(target.value) });
  };

  render() {
    const { costs } = this.props.store;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, costs.length - page * rowsPerPage);

    console.log('costs:', costs);

    let sortedCosts: Cost[];
    if (costs.length > 0) {
      sortedCosts = costs
        .slice()
        .sort((b: Cost, a: Cost): any => a.date > b.date); ///////////////////////////////////
    } else
      sortedCosts = [
        {
          count: 0,
          chosenItems: [''],
          date: 'No shopping yet'
        }
      ];

    return (
      <>
        <DataTable style={{ border: '1px solid black', minWidth: '500px' }}>
          <StyledDataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Items</DataTableHeadCell>
                <DataTableHeadCell>Date</DataTableHeadCell>
                <DataTableHeadCell alignEnd>Cost</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {sortedCosts.map((cost: Cost, index: number) => (
                <DataTableRow key={index}>
                  <StyledDataTableCell>{cost.chosenItems.join(', ')}</StyledDataTableCell>
                  <StyledDataTableCell>{cost.date}</StyledDataTableCell>
                  <StyledDataTableCell alignEnd>{cost.count}</StyledDataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </StyledDataTableContent>
        </DataTable>
        <CostsCard sortedCosts={sortedCosts} />
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
