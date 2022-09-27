import React from 'react';
import PRODUCTS from '../data/Products';

const ListContext = React.createContext({
	items: PRODUCTS,
});

export default ListContext;
