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
      return addToList(state,action);
    case 'REMOVE':
      return removeToList(state,action)
    default:
    return defaultListState;

  }
}

const addToList = (state, action) => {
   const existingListItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
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
}

const removeToList =  (state, action) => {
    const existingListItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingListItemIndex];
     let updatedItems;
    if (existingItem.qty === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, qty: existingItem.qty - 1 };
      updatedItems = [...state.items];
      updatedItems[existingListItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
}

const ListProvider = (props) => {
	const [listState, dispatchListAction] = useReducer(
		listReducer,
		defaultListState
	);

	const addItemToListHandler = (item) => {
    console.log(item);
		dispatchListAction({ type: 'ADD', item: item });
	};

	const removeItemFromListHandler = (id) => {
		dispatchListAction({ type: 'REMOVE', id: id });
	};

	const listContext = {
		items: listState.items,
		addItem: addItemToListHandler,
		removeItem: removeItemFromListHandler,
	};

	return (
		<ListContext.Provider value={listContext}>
			{props.children}
		</ListContext.Provider>
	);
};

export default ListProvider;