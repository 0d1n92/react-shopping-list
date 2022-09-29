import React from 'react';
import PRODUCTS from '../data/Products';

const ListContext = React.createContext({
	items: PRODUCTS,
	addItem: (item) => {},
	removeItem: (item) => {},
	updateItem: (item) => {},
	checkItem: (item) => {},
  delete:(id) => {},
});

export default ListContext;
