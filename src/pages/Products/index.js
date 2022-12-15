import { Stack } from '@mui/material'
import React from 'react'
import AppDataGrid from '../../components/AppDataGrid'
import Page from '../../components/Page'
import { useNavigate } from 'react-router-dom';

const rows = [
    { id: 1, col1: 'Hello', col2: 'World', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 3, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 4, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 5, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 6, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 7, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 8, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 9, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 10, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 11, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 12, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 13, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
    { id: 14, col1: 'MUI', col2: 'is Amazing', col3: '23', col4: 'wewe', col5: 'df' },
];
const columns = [
    { field: 'col1', headerName: 'Product', width: 150 },
    { field: 'col2', headerName: 'SKU', width: 150 },
    { field: 'col3', headerName: 'UPC', width: 150 },
    { field: 'col4', headerName: 'CODE', width: 150 },
    { field: 'col5', headerName: 'Category', width: 150 },
];

const ProductList = () => {
    const navigate = useNavigate();

    return (
        <Page
            title="Products | Merno"
            legend={`Products`}
        >
            <Stack
                direction="column"
                spacing={1}
            >
                <AppDataGrid
                    rows={rows}
                    columns={columns}
                    disableForm={true}
                    addActionLabel="Add Product"
                    onAddClick={() => {
                        navigate('add')
                    }}
                />
            </Stack>
        </Page>
    )
}

export default ProductList