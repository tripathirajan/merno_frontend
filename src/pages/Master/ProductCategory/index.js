import React, { useCallback, useEffect } from 'react'
import AppDataGrid from '../../../components/AppDataGrid';
import Page from '../../../components/Page';
import ActiveInactive from '../../../components/Renderer/ActiveInactive';
import { useDispatch, useSelector } from 'react-redux';
import { resetProductCategoryList, selectProductCategoryList } from '../../../storage/slices/masterSlice';
import { addProductCategory, getProductCategoryList, updateProductCategory } from '../../../storage/actions/masterAction';
import DateTimeRenderer from '../../../components/Renderer/DateTimeRenderer';

const columns = [
    { field: 'name', headerName: 'Product Category', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'isActive', headerName: 'Status', width: 100, type: 'boolean', renderCell: ActiveInactive },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    { field: 'createdAt', headerName: 'Created On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
    { field: 'updatedBy', headerName: 'Last Modified By', width: 150 },
    { field: 'updatedAt', headerName: 'Last Modified On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
];

const ProductCategory = () => {
    const { items, totalRecord } = useSelector(selectProductCategoryList);
    const dispatch = useDispatch();

    const loadListItems = useCallback(() => {
        dispatch(getProductCategoryList());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        loadListItems();
        return () => dispatch(resetProductCategoryList());
    }, [loadListItems, dispatch]);

    const handleAfterFormClose = (reload = false) => {
        if (!reload) {
            return;
        }
        loadListItems();
    }

    return (
        <Page
            title="Product Category | Master"
            legend="Product Category"
        >
            <AppDataGrid
                columns={columns}
                rows={items}
                keyField="name"
                title="Product Category"
                onFormSave={addProductCategory}
                onFormUpdate={updateProductCategory}
                afterFormClose={handleAfterFormClose}
                totalRecord={totalRecord}
            />
        </Page>
    )
}

export default ProductCategory;