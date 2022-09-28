import { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import ToolBarInput from './ToolBarInput';
import ListContext from '../store/list-context';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { AppBar, Button, IconButton, Toolbar } from '@mui/material';

const BoxToolbar = (props) => {
  const [enteredItem, setEnteredItem]= useState('');
  const listCtx = useContext(ListContext);

  const onChangeAddItem = (e) => {
		e.preventDefault();
		setEnteredItem(e.target.value);
	};
  const addItemHeadler =() => {
      listCtx.addItem({
				id: listCtx.items[listCtx.items.length -1].id ++,
				name: enteredItem,
				qty: 1,
			});
  }

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ display: { xs: 'none', sm: 'block' } }}
				>
					SHOPPING LIST
				</Typography>
				<ToolBarInput
					onChange={onChangeAddItem}
					placeholder={'Add item'}
				></ToolBarInput>
				<Button onClick={addItemHeadler}>Add</Button>
				<ToolBarInput
					onChange={props.onSearch}
					placeholder={'Search'}
				></ToolBarInput>
				<IconButton title="filtra per completati" onClick={props.filterChecked}>
					<FilterAltIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default BoxToolbar;
