import * as React from 'react';

import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Cost, CostCategoryType } from '../../../../lib/interfaces';

import ReactTable, { FinalState, RowInfo } from 'react-table';

interface TableContainerProps {
  getCosts?: () => void;
  costs: Cost[];
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  setChosenCost: (cost: Cost) => Cost;
  notClickable?: boolean;
  wrapWords?: boolean;
}

@observer
export class TableContainer extends React.Component<TableContainerProps, {}> {
  @observable private displayedCosts = this.props.costs;
  private readonly wrapStyles = {
    whiteSpace: 'pre-wrap',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  private readonly columns = [
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

  componentDidMount = () => {
    if (this.props.getCosts) {
      this.props.getCosts();
    }
  };

  componentDidUpdate = (prevProps: TableContainerProps) => {
    if (prevProps !== this.props) {
      this.displayedCosts = this.parseCosts(this.props.costs) as any;
    }
  };

  private getRowColor = (category: CostCategoryType) => {
    switch (category) {
      case 'shopping':
        return 'black';
      case 'bill':
        return 'blue';
      case 'health':
        return 'green';
      case 'car':
        return 'red';
      case 'other':
        return 'grey';
      default:
        return 'yellow';
    }
  };

  private parseCosts = (costs: Cost[]) => {
    let parsedCosts = costs;

    if (parsedCosts.length < 1) {
      return [
        {
          count: 0,
          chosenItems: [' - - - - - - '],
          date: ' - - - - - - ',
          category: 'shopping'
        }
      ];
    } else {
      parsedCosts.map((cost: Cost) => {
        if (cost.category === 'shopping') {
          if (cost.chosenItems.length > 0) {
            if (cost.chosenItems.length > 1) {
              cost.chosenItems = [cost.chosenItems.join(', ')];
            }
          } else {
            cost.chosenItems = [' - - - '];
          }
        } else {
          if (cost.info && cost.chosenItems.length > 0) {
            if (!cost.chosenItems[0].includes(cost.info)) {
              cost.chosenItems = [`${cost.chosenItems[0]} (${cost.info})`];
            } else {
              cost.chosenItems = [`${cost.chosenItems[0]}`];
            }
          }
        }
      });

      return parsedCosts;
    }
  };

  private handleCostClick = (cost: Cost) => {
    const { setVisibleDialog, visibleDialog, setChosenCost } = this.props;

    setVisibleDialog(`${visibleDialog}CostManager`);
    setChosenCost(cost);
  };

  render() {
    return (
      <ReactTable
        data={this.displayedCosts as any}
        columns={this.columns}
        defaultPageSize={10}
        className='-striped -highlight'
        getTdProps={() => ({
          style: this.props.wrapWords ? this.wrapStyles : null
        })}
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
              color: this.getRowColor(category)
            }
          };
        }}
      />
    );
  }
}
