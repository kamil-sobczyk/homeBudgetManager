import * as React from 'react';

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
      sortedCosts = costs.slice().sort((b: Cost, a: Cost): any => a.date > b.date); ///////////////////////////////////
    } else
      sortedCosts = [
        {
          count: 0,
          chosenItems: [''],
          date: 'No shopping yet'
        }
      ];

    if (costs.length > 0) sortedCosts = costs;

    console.log(sortedCosts)

    return (
      <>
        <DataTable style={{ border: '1px solid black', minWidth: '500px' }}>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Items</DataTableHeadCell>
                <DataTableHeadCell alignEnd>Cost</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {sortedCosts.map(cost => {
                <DataTableRow>
                  <DataTableCell>{cost.chosenItems}</DataTableCell>
                  <DataTableCell alignEnd>{cost.count}</DataTableCell>
                </DataTableRow>;
              })}
            </DataTableBody>
          </DataTableContent>
        </DataTable>
        {/* <DataTable>
          {sortedCosts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <DataTableRow key={index}>
                <DataTableCell>{row.date}</DataTableCell>
                <DataTableCell>{row.count + 'zł'}</DataTableCell>
              </DataTableRow>
            ))}

          {emptyRows > 0 && (
            <DataTableRow style={{ height: 48 * emptyRows }}>
              <DataTableCell colSpan={6} />
            </DataTableRow>
          )}

          {/* <TableFooter>
              <DataTableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={costs.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                //   ActionsComponent={Pagination}
                />
              </DataTableRow>
            </TableFooter> 
        </DataTable>*/}

        <CostsCard sortedCosts={sortedCosts} />
      </>
    );
  }
}
