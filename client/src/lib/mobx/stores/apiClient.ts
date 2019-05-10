import axios from 'axios';

import { Store } from '../rootStore';
import { Cost } from '../../interfaces';

import { Item } from '../../interfaces';

const localhost = 'http://0.0.0.0:8080/';
const privateList = 'http://35.224.13.129/';
const publicDemo = 'http://35.184.211.161/';
const server = localhost;

export class ApiClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  getItems = async (): Promise<Item[]> =>
    await axios
      .get(server + 'store/items')
      .then(items => (this.store.items = items.data as Item[]));

  getSelected = async (): Promise<Item[]> =>
    axios
      .get(server + 'store/selected')
      .then(selected => (this.store.selected = selected.data as Item[]));

  getCosts = async (): Promise<Cost[]> =>
    axios
      .get(server + 'store/costs')
      .then(response => response) ///json
      .then(costs => (this.store.costs = costs as any)); //////////////////////////////////

  deleteItemsOnServer = async (index: number) => {  ///type
    axios
      .delete(server + 'store/items', { data: { index: index } })
      .then(response => response) ///json
      .then(state => state);
  };
}

// const changeItemsOnServer = body => {
//   fetch(server + 'store/items', {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     mode: 'cors',
//     body: JSON.stringify(body)
//   })
//     .then(response => {
//       return response;
//     })
//     .then(items => {
//       return items.json();
//     })
//     .catch(error => console.log('Ooops', error));
// };
// const changeSelectedOnServer = body => {
//   fetch(server + 'store/selected', {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     mode: 'cors',
//     body: JSON.stringify(body)
//   })
//     .then(response => {
//       return response;
//     })
//     .then(selected => {
//       return selected.json();
//     })
//     .catch(error => console.log('Ooops', error));
// };

// const addNewItemOnServer = body => {
//   fetch(server + 'store/items', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     mode: 'cors',
//     body: JSON.stringify(body)
//   })
//     .then(response => {
//       return response.json();
//     })
//     .then(item => {
//       return item;
//     })
//     .catch(error => console.log('Ooops', error));
// };

// const deleteItemsOnServer = activeItem => {
//   fetch(server + 'store/items', {
//     method: 'DELETE',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     mode: 'cors',
//     body: JSON.stringify(activeItem)
//   })
//     .then(response => {
//       return response.json();
//     })
//     .then(state => {
//       return state;
//     })
//     .catch(error => console.log('Ooops', error));
// };

// const editItemOnServer = (newItem, activeItem) => {
//   fetch(server + 'store', {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     mode: 'cors',
//     body: JSON.stringify({ activeItem: activeItem, newItem: newItem })
//   })
//     .then(response => {
//       return response.json();
//     })
//     .then(state => {
//       return state;
//     })
//     .catch(error => console.log('Ooops', error));
// };

// const getCostsFromServer = dispatch => {
//   fetch(server + 'store/costs', {
//     mode: 'cors',
//     method: 'GET'
//   })
//     .then(response => {
//       return response.json();
//     })
//     .then(costs => {
//       return dispatch(costs);
//     });
// };

// const addCostsOnServer = (dispatch, costs) => {
//   fetch(server + 'store/costs', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     mode: 'cors',
//     body: JSON.stringify(costs)
//   })
//     .then(response => {
//       return response.json();
//     })
//     .then(state => {
//       return dispatch(state);
//     })
//     .catch(error => console.log('Ooops', error));
// };

// export {
//   getItemsFromServer,
//   getSelectedFromServer,
//   changeSelectedOnServer,
//   changeItemsOnServer,
//   addNewItemOnServer,
//   deleteItemsOnServer,
//   editItemOnServer,
//   getCostsFromServer,
//   addCostsOnServer
// };
