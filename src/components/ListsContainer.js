
import { Grid} from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import { Container } from "@mui/system";
import { Fragment, useContext, useState} from 'react';
import ListContext from '../store/list-context';
import BoxToolbar from "./BoxToolbar";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ListContainer = () => {
  const listCtx = useContext(ListContext);
  const [rowTable, setRowTable] = useState(listCtx.items);
  const [filtred, setFiltered] = useState(false);
  const handleRowSearch = (e) => {
    if (e.target.value.length > 3) {
      let finded= [];
			rowTable.forEach((item) => {
        if(item.name.toLowerCase().includes(e.target.value.toLowerCase())){
            finded.push(item);
        }
			});
      setRowTable(finded);
    } else {
      setRowTable(listCtx.items);
    }
	};
  const handleFilter = (e)=> {
      e.preventDefault();
      if(!filtred){
        setFiltered(true);
        let finded = listCtx.items.filter((item) => {
          return item.checked === true;
        });
        setRowTable(finded);
      } else {
        setFiltered(false);
        setRowTable(listCtx.items);
      }
    }
  const handleCellClick = (param, event) => {
		event.stopPropagation();
     listCtx.checkItem(param);
	};


 const handleRowEditCommit= (params,e) => {
		listCtx.updateItem(params)
  };

  const columns = [
		{
			field: 'name',
			headerName: 'Product',
			width: 130,
			editable: true,
		},
		{ field: 'qty', headerName: 'Quantity', width: 130 },
		{
			field: 'actions',
      width: 250,
			renderCell: (rowItem) => {
				return (
					<Fragment>
						<IconButton
							onClick={(e) => {
								listCtx.addItem({ ...rowItem.row, qty: 1 });
                rowItem.row.qty += 1

							}}
							aria-label="delete"
						>
							<AddIcon />
						</IconButton>

						<IconButton
							onClick={(event) => {
								listCtx.removeItem(rowItem.row.id);
                rowItem.row.qty -= 1;
                if(rowItem.row.qty < 1 ){

                }
							}}
						>
							<RemoveIcon />
						</IconButton>
					</Fragment>
				);
			},
		},
	];
  return (
		<Container>
			<Grid container justify="center">
				<BoxToolbar filterChecked={handleFilter} onSearch={handleRowSearch} />
				<DataGrid
					disableSelectionOnClick={true}
					autoHeight={true}
					rowHeight={120}
					rows={rowTable}
					columns={columns}
					onCellEditCommit={handleRowEditCommit}
					checkboxSelection
					onCellClick={handleCellClick}
				/>
			</Grid>
		</Container>
	);
}

export default ListContainer;