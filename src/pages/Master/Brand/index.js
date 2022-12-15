import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AppDataGrid from '../../../components/AppDataGrid';
import Page from '../../../components/Page';
import ActiveInactive from '../../../components/Renderer/ActiveInactive';
import DateTimeRenderer from '../../../components/Renderer/DateTimeRenderer';
import { addBrand, getBrandList, updateBrand } from '../../../storage/actions/masterAction';
import { resetBrandList, selectBrandList } from '../../../storage/slices/masterSlice';

const columns = [
    { field: 'name', headerName: 'Brand', width: 180 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'isActive', headerName: 'Status', width: 100, type: 'boolean', renderCell: ActiveInactive },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    { field: 'createdAt', headerName: 'Created On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
    { field: 'updatedBy', headerName: 'Last Modified By', width: 150 },
    { field: 'updatedAt', headerName: 'Last Modified On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
];

const Brand = () => {
    const { items, totalRecord } = useSelector(selectBrandList);
    const dispatch = useDispatch();

    const loadBrandList = useCallback(() => {
        dispatch(getBrandList());

        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        loadBrandList();
        return () => dispatch(resetBrandList());
    }, [loadBrandList, dispatch]);


    const handleAfterFormClose = (reload = false) => {
        if (!reload) {
            return;
        }
        loadBrandList();
    }

    return (
        <Page
            title="Brand | Master"
            legend="Brands"
        >
            <AppDataGrid
                columns={columns}
                rows={items}
                keyField="name"
                title="Brand"
                onFormSave={addBrand}
                onFormUpdate={updateBrand}
                afterFormClose={handleAfterFormClose}
                totalRecord={totalRecord}
            />
        </Page>
    )
}

export default Brand;