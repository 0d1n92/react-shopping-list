import React from 'react';
import PRODUCTS from '../data/Products';

const ListContext = React.createContext({
	items: PRODUCTS,
	addItem: (item) => {},
	removeItem: (id) => {},
	updateItem: (item) => {},
	checkItem: (item) => {},
});

export default ListContext;
