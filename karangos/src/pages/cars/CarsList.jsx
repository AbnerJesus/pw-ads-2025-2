import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function CarsList() {
  
  // Definição das colunas
  const columns = [
    { field: '_id', headerName: 'Cód.', width: 90 },
    {
      field: 'brand_model',
      headerName: 'Marca / Modelo',
      width: 200,
      valueGetter: (value, row) => {
        if (!row) return '';
        return `${row.brand} / ${row.model}`;
      },
    },
    { field: 'color', headerName: 'Cor', width: 130 },
    {
      field: 'year_manufacture',
      headerName: 'Ano Fab.',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'imported',
      headerName: 'Importado',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (params.value === 1 ? 'Sim' : ''),
    },
    { field: 'plates', headerName: 'Placas', width: 120 },
    {
      field: 'selling_price',
      headerName: 'Preço Venda',
      width: 150,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: (value) => {
        if (value) return Number(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        return '';
      },
    },
    {
      field: 'selling_date',
      headerName: 'Data Venda',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: (value) => {
        if (value) {
          const date = new Date(value);
          return date.toLocaleDateString('pt-br');
        }
        return '';
      },
    },
  ];

  const [cars, setCars] = React.useState([]);

  async function loadData() {
    try {
      const response = await fetch('https://api.faustocintra.com.br/v2/cars');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error(error);
      alert('ERRO: ' + error.message);
    }
  }

  React.useEffect(() => {
    loadData();
  }, []);

return <>
    <Typography variant="h1" gutterBottom>
      Listagem de veículos
    </Typography>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={cars}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  </>
 
}