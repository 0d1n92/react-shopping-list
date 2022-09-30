import { useReducer } from 'react';
import PRODUCTS from '../data/Products';

import ListContext from './list-context';

const defaultListState = {
  items: PRODUCTS,
};
const listReducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'ADD':
      return addToList(state, action);
    case 'REMOVE':
      return removeToList(state, action);
    case 'UPDATE':
      return updateItem(state, action);
    case 'CHECK':
      return checkedToList(state, action);
    case 'DELETE':
      return delateToList(state, action);
    default:
      return defaultListState;
  }
};

const updateItem = (state, action) => {
  const existingListItemIndex = state.items.findIndex((item) => item.id === action.item.id);
  let updatedItems = [...state.items];
  updatedItems[existingListItemIndex].name = action.item.value;
  return {
    items: updatedItems,
  };
};

const addToList = (state, action) => {
  const existingListItemIndex = state.items.findIndex((item) => item.name.toLowerCase() === action.item.name.toLowerCase());
  const existingListItem = state.items[existingListItemIndex];
  let updatedItems = {};
  if (existingListItem) {
    const updatedItem = {
      ...existingListItem,
      qty: existingListItem.qty + action.item.qty,
    };
    updatedItems = [...state.items];
    updatedItems[existingListItemIndex] = updatedItem;
  } else {
    updatedItems = state.items.concat(action.item);
  }
  return {
    items: updatedItems,
  };
};

const removeToList = (state, action) => {
  const existingListItemIndex = state.items.findIndex((item) => item.id === action.item.id);
  const existingItem = state.items[existingListItemIndex];
  let updatedItems;
  if (action.item.qty === 0) {
    updatedItems = state.items.filter((item) => item.id !== action.item.id);
  } else {
    const updatedItem = { ...existingItem, qty: action.item.qty };
    updatedItems = [...state.items];
    updatedItems[existingListItemIndex] = updatedItem;
  }

  return {
    items: updatedItems,
  };
};
const delateToList = (state, action) => {
  let updatedItems = state.items.filter((item) => item.id !== action.id);
  return {
    items: updatedItems,
  };
};

const checkedToList = (state, action) => {
  action.item.forEach((item) => (item.checked = true));
  let updatedItems = [];
   state.items.forEach(
    (item)=> {
      let exist = action.item.find(x => x.id === item.id);
      if(exist !== undefined) {
        updatedItems.push(exist);
      } else{
         updatedItems.push({...item, checked:false});
      }
    }
  )
  
  return {
    items: updatedItems,
  };
};

const ListProvider = (props) => {
  const [listState, dispatchListAction] = useReducer(listReducer, defaultListState);

  const addItemToListHandler = (item) => {
    dispatchListAction({ type: 'ADD', item: item });
  };

  const updateItemtHandler = (item) => {
    dispatchListAction({ type: 'UPDATE', item: item });
  };

  const checkItemHandler = (item) => {
    dispatchListAction({ type: 'CHECK', item: item });
  };

  const removeItemFromListHandler = (item) => {
    dispatchListAction({ type: 'REMOVE', item: item });
  };

  const deleteItemFromListHandler = (id) => {
    dispatchListAction({ type: 'DELETE', id: id });
  };

  const listContext = {
    items: listState.items,
    addItem: addItemToListHandler,
    removeItem: removeItemFromListHandler,
    updateItem: updateItemtHandler,
    checkItem: checkItemHandler,
    deleteItem: deleteItemFromListHandler,
  };

  return <ListContext.Provider value={listContext}>{props.children}</ListContext.Provider>;
};

export default ListProvider;
