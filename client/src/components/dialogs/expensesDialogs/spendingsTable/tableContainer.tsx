import * as React from 'react';

import { observer } from 'mobx-react';

import { Cost, CostCategoryType } from '../../../../lib/interfaces';

import ReactTable, { FinalState, RowInfo } from 'react-table';
import { observable } from 'mobx';

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
  notClickable?: boolean;
}

@observer
export class TableContainer extends React.Component<TableContainerProps, {}> {
  componentDidMount = () => {
    if (this.props.getCosts) {
      this.props.getCosts();
    }
  };

  componentDidUpdate = (props: TableContainerProps) => {
    this.displayedCosts = this.parseCosts(props.costs);
  };

  parseCosts = (costs: Cost[]) => {
    if (costs.length < 1) {
      return [
        {
          count: 0,
          chosenItems: [' - - - - - - '],
          date: ' - - - - - - ',
          category: 'shopping'
        }
      ];
    } else {
      costs.forEach((cost: Cost) => {
        if (cost.category === 'shopping') {
          if (cost.chosenItems.length > 0) {
            if (cost.chosenItems.length > 1) {
              console.log(JSON.stringify(cost.chosenItems));
              cost.chosenItems = [cost.chosenItems.join(', ')];
              console.log(JSON.stringify(cost.chosenItems))
            }
          } else {
            cost.chosenItems = [' - - - '];
          }
        } else {
          if (cost.info && cost.chosenItems.length > 0) {
            cost.chosenItems = [`${cost.chosenItems[0]} (${cost.info})`];
          }
        }
      });

      return costs;
    }
  };

  @observable displayedCosts = this.parseCosts(this.props.costs);

  handleCostClick = (cost: Cost) => {
    const { setVisibleDialog, visibleDialog, setChosenCost } = this.props;

    setVisibleDialog(`${visibleDialog}CostManager`);
    setChosenCost(cost);
  };

  render() {
    return (
      <ReactTable
        data={this.displayedCosts as any}
        // loading={displayedCosts.length > 0 ? false : true}
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
              if (rowInfo && !this.props.notClickable) {
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
