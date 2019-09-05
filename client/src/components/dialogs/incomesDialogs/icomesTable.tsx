import * as React from 'react';

import styled from 'styled-components';
import { Income, IncomeCategoryType } from '../../../lib/interfaces';
import { observer } from 'mobx-react';

import '@rmwc/data-table/data-table.css';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { StyledDeleteButton } from '../../lists/items/moreMenu';
import { sortCostsOrIncomes } from '../../../lib/mobx/stores/apiClient';

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

  getClickedIncome = (event: any): Income => {
    const cell = (event.target as HTMLElement).parentElement;
    const row = (cell as HTMLElement).parentElement;
    const categoryCell = (row as HTMLElement).firstElementChild;
    const category = (categoryCell as HTMLElement).innerHTML;
    const dateCell = (categoryCell as HTMLElement).nextElementSibling;
    const date = (dateCell as HTMLElement).innerHTML;
    const countCell = (dateCell as HTMLElement).nextElementSibling;
    const count = parseInt((countCell as HTMLElement).innerHTML);

    return { category: category as IncomeCategoryType, date, count };
  };

  handleClickDeleteIncome = (event: any) => {
    const { setVisibleDialog, setActiveIncome } = this.props;

    setVisibleDialog('IncomesDialogDeleteIncomeDialog');
    setActiveIncome(this.getClickedIncome(event));
  };

  render() {

    const sortedIncomes = sortCostsOrIncomes(this.props.incomes) as Income[];

    const columns = [
      {
        Header: 'Category',
        accessor: 'category'
      },
      {
        Header: 'Date',
        accessor: 'date'
      },
      {
        Header: 'Count',
        minWidth: 45,
        accessor: 'count'
      },
      {
        Header: '',
        Cell: (
          <DeleteButton
            icon='delete'
            onClick={e => this.handleClickDeleteIncome(e)}
          />
        ),
        minWidth: 25,
        styles: 'background: red'
      }
    ];

    return (
      <ReactTable
        data={sortedIncomes}
        columns={columns}
        defaultPageSize={10}
        className='-striped -highlight'
      />
    );
  }
}

const DeleteButton = styled(StyledDeleteButton)`
  position: relative;
  left: -15px;
`;
