import React from 'react'
import { useNavigate } from 'react-router-dom';
import AppDataGrid from '../../components/AppDataGrid';
import Page from '../../components/Page';

const columns = [
    { field: 'col1', headerName: 'Vendor', width: 150 },
    { field: 'col2', headerName: 'Code', width: 150 },
    { field: 'col3', headerName: 'Address', width: 150 },
    { field: 'col4', headerName: 'Status', width: 150 },
    { field: 'col5', headerName: 'Category', width: 150 },
];

const Vendor = () => {
    const navigate = useNavigate();

    return (
        <Page
            title="Vendor | Merno"
            legend={`Vendors`}
        >
            <AppDataGrid
                columns={columns}
                rows={[]}
                disableForm={true}
                addActionLabel="Add Vendor"
                onAddClick={() => {
                    navigate('add')
                }}
            />
        </Page>
    )
}

export default Vendor;