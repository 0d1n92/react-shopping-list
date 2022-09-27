
import { Button, Grid} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from "@mui/system";
import { useContext } from 'react';
import ListContext from '../store/list-context';
import BoxToolbar from "./BoxToolbar";

const ListContainer = () => {
  const listCtx = useContext(ListContext);
  const columns = [
		{
			field: 'name',
			headerName: 'Product',
			width: 130,
		},
		{ field: 'qty', headerName: 'Quantity', width: 130 },
		{
			field: 'Increases',
			renderCell: (rowItem) => {
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={(e) => {
							listCtx.addItem({ ...rowItem.row, qty: 1 });
						}}
					>
						Increases
					</Button>
				);
			},
		},
		{
			field: 'Delete',
			renderCell: (rowItem) => {
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={(event) => {
							listCtx.removeItem(rowItem.row.id);
						}}
					>
						Delete
					</Button>
				);
			},
		},
	];
  return (
		<Container>
			<Grid container justify="center">
				<BoxToolbar />
				<DataGrid
					autoHeight={true}
					rowHeight={120}
					rows={listCtx.items}
					columns={columns}
					pageSize={5}
					checkboxSelection
					/* onCellClick={handleCellClick}
					onRowClick={handleRowClick} */
				/>
			</Grid>
		</Container>
	);
}

export default ListContainer;