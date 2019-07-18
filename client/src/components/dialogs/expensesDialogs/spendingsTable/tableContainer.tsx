import * as React from 'react';

import { observer } from 'mobx-react';

import { Cost, CostCategoryType } from '../../../../lib/interfaces';

import ReactTable, { FinalState, RowInfo } from 'react-table';

const getRowColor = (category: CostCategoryType) => {
  if (category === 'shopping') return 'black';
  else if (category === 'bill') return 'blue';
  else if (category === 'health') return 'green';
  else if (category === 'car') return 'red';
  else if (category === 'other') return 'grey';
  else return 'yellow';
};

const columns = [
  {
    Header: 'Items',
    accessor: 'chosenItems'
  },
  {
    Header: 'Date',
    accessor: 'date'
  },
  {
    Header: 'Cost',
    minWidth: 45,
    accessor: 'count'
  }
];

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
      <ReactTable
        data={displayedCosts}
        loading={displayedCosts.length > 0 ? false : true}
        columns={columns}
        defaultPageSize={10}
        className='-striped -highlight'
        getTrProps={(state: FinalState, rowInfo?: RowInfo) => {
          let category: CostCategoryType = 'bill';
          if (rowInfo) {
            category = rowInfo.original.category;
          }
          return {
            onClick: (): void => {
              if (rowInfo) {
                this.handleCostClick(rowInfo.original);
              }
            },
            style: {
              color: getRowColor(category)
            }
          };
        }}
      />
    );
  }
}
