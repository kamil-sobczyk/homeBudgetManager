import * as React from "react";

import * as styled from "styled-components";

import { Store, Cost } from "../../lib/App/store";

import {DataTable, DataTableContent, DataTableRow, DataTableHeadCell, DataTableBody, DataTableCell} from '@rmwc/data-table'



// import Pagination from "./tablePagination";
import {CostsCard} from "./costsCard";

interface TableContainerProps {
    store: Store;
}

interface TableContainerState {
    page: number;
    rowsPerPage: number;
    costs: Cost[];
}

// @observer
export class TableContainer extends React.Component<TableContainerProps, TableContainerState> {
  state = {
    page: 0,
    rowsPerPage: 5,
    costs: []
  };

  componentDidMount = (): void => {
    // getCostsFromServer(this.props.getCosts);
  };

  handleChangePage = (event: React.FormEvent<EventTarget>, page: number): void => {
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

    let sortedCosts: Cost[];
    if (costs.length > 0) {
      sortedCosts = costs.sort((b: any, a: any): any => a.date > b.date);           ///////////////////////////////////
    } else
      sortedCosts = [
        {
          count: 0,
          chosenItems: [""],
          date: "No shopping yet"
        }
      ];

    return (
<>
          <DataTable >
            <DataTableBody>
               {/*               {sortedCosts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                //   <Tooltip
                //     disableFocusListener
                //     title={row.chosenItems.join(", ")}
                //     placement="right"
                //     key={index}
                //   >
                    <DataTableRow key={index}>
                      <DataTableCell component="th" scope="row">
                        {row.date}
                      </DataTableCell>
                      <TableCell align="right">{row.count + "zł"}</TableCell>
                    </DataTableRow>
                  </Tooltip>
                ))} */} 

              {emptyRows > 0 && (
                <DataTableRow style={{ height: 48 * emptyRows }}>
                  <DataTableCell colSpan={6} />
                </DataTableRow>
              )}
            </DataTableBody>
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
            </TableFooter> */} 
            
          </DataTable>
        
        <CostsCard sortedCosts={sortedCosts} /> 
    </>
    );
  }
}
