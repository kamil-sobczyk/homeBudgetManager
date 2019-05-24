import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import { ListsContainer } from './listsContainer';
import { DialogsContainer } from '../dialogs/dialogsContainer';

import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  BarChart,
  Legend,
  Bar
} from 'recharts';

const chartData = [
  {
    name: 'May',
    shopping: 4000,
    bills: 2400,
    amt: 2400
  },
  {
    name: 'June',
    shopping: 3000,
    bills: 1398,
    amt: 2210
  },
  {
    name: 'July',
    shopping: 2000,
    bills: 9800,
    amt: 2290
  },
  {
    name: 'September',
    shopping: 2780,
    bills: 3908,
    amt: 2000
  },
  {
    name: 'October',
    shopping: 1890,
    bills: 4800,
    amt: 2181
  },
  {
    name: 'November',
    shopping: 2390,
    bills: 3800,
    amt: 2500
  },
  {
    name: 'December',
    shopping: 3490,
    bills: 4300,
    amt: 2100
  }
];

export const ListBox = observer(({ store }: StoreProps) => {
  const {
    costs,
    items,
    selected,
    visibilityClient,
    itemMenagerClient,
    apiClient,
    shoppingClient,
    dndClient
  } = store;
  return (
    <>
      <ListsContainer
        getItems={apiClient.getItems}
        getSelected={apiClient.getSelected}
        items={items}
        selected={selected}
        toggleShowItems={visibilityClient.toggleShowItems}
        toggleCheckItems={itemMenagerClient.toggleCheckItems}
        showItems={visibilityClient.showItems}
        setActiveItem={itemMenagerClient.setActiveItem}
        deleteItem={itemMenagerClient.deleteItem}
        onDragEnd={dndClient.onDragEnd}
        setVisibleDialog={visibilityClient.setVisibleDialog}
        visibleDialog={visibilityClient.visibleDialog}
      />
      <DialogsContainer
        costs={costs}
        items={items}
        selected={selected}
        visibilityClient={visibilityClient}
        itemMenagerClient={itemMenagerClient}
        apiClient={apiClient}
        shoppingClient={shoppingClient}
      />
      <BarChart width={730} height={250} data={chartData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="bills" fill="#8884d8" />
  <Bar dataKey="shopping" fill="#82ca9d" />
</BarChart>
    </>
  );
});
