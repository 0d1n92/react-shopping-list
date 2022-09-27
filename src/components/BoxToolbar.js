import React from "react";
import Typography from '@mui/material/Typography';
import ToolBarSearch from './ToolBarSearch';

import { AppBar,Toolbar } from '@mui/material';


const BoxToolbar = () => {
  return (
		<AppBar position="static">
			<Toolbar>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ display: { xs: 'none', sm: 'block' } }}
				>
					Lista della spesa
				</Typography>
				<ToolBarSearch placeholder={'Search...'}></ToolBarSearch>
			</Toolbar>
		</AppBar>
	);
}

export default BoxToolbar;