import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import ListContext from '../store/list-context';
import BoxToolbar from './BoxToolbar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const ListContainer = () => {
  const listCtx = useContext(ListContext);
  const [rowTable, setRowTable] = useState(listCtx.items);
  const [filtred, setFiltered] = useState(false);
   const [find, setFind] = useState(false);
  const handleRowSearch = (e) => {
    if (e.target.value.length > 3) {
      let finded = [];
      rowTable.forEach((item) => {
        if (item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          finded.push(item);
        }
      });
       setFind(true);
      setRowTable(finded);
    } else {
      setRowTable(listCtx.items);
       setFind(false);
    }
  };
  useEffect(() => {
    if(!find){
    setRowTable(listCtx.items);
    }
  }, [listCtx]);

  const addItemHeadler = (newname) => {
    listCtx.addItem({
      id: listCtx.items[listCtx.items.length - 1].id++,
      name: newname,
      qty: 1,
      checked: false,
    });
  };

  const renderRemove = useCallback(
    (rowItem) => {
      listCtx.removeItem(rowItem.row);
      if (rowItem.row.qty > 0) {
        rowItem.row.qty -= 1;
      } else {
        setRowTable(listCtx.items);
      }
    },
    [listCtx]
  );

  const handleFilter = (e) => {
    e.preventDefault();
    if (!filtred) {
      setFiltered(true);
      let finded = listCtx.items.filter((item) => {
        return item.checked === true;
      });
      setRowTable(finded);
    } else {
      setFiltered(false);
      setRowTable(listCtx.items);
    }
  };
  const handleCellClick = (param) => {
    listCtx.checkItem(param);
  };

  const deleteRow = (e, id) => {
    listCtx.deleteItem(id);
    setRowTable(listCtx.items);
  };

  const handleRowEditCommit = (params, e) => {
    listCtx.updateItem(params);
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
                if(find)
                rowItem.row.qty++;
              }}
              aria-label="delete"
            >
              <AddIcon />
            </IconButton>

            <IconButton
              onClick={(event) => {
                renderRemove(rowItem);
              }}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                deleteRow(e, rowItem.row.id);
              }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Fragment>
        );
      },
    },
  ];
  return (
    <Container>
      <Grid container justify="center">
        <BoxToolbar filterChecked={handleFilter} onSearch={handleRowSearch} onAdd={addItemHeadler} />
        <DataGrid
          disableSelectionOnClick={true}
          autoHeight={true}
          rowHeight={120}
          rows={rowTable}
          columns={columns}
          onCellEditCommit={handleRowEditCommit}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
             const selectedRowsData = newSelectionModel.map((id) => rowTable.find((row) => row.id === id));
             handleCellClick(selectedRowsData);
          }}
        />
      </Grid>
    </Container>
  );
};

export default ListContainer;
