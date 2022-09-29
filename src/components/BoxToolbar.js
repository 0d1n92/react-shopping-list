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
				<Button onClick={() => {props.onAdd(enteredItem)}}>Add</Button>
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
