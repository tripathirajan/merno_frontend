import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../../components/Page';
import AppDataGrid from '../../../components/AppDataGrid';
import DateTimeRenderer from '../../../components/Renderer/DateTimeRenderer';
import ActiveInactive from '../../../components/Renderer/ActiveInactive';
import { addPackageType, getPackageTypeList, updatePackageType } from '../../../storage/actions/masterAction';
import { resetPackageTypeList, selectPackageTypeList } from '../../../storage/slices/masterSlice';

const columns = [
    { field: 'name', headerName: 'Package Type', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'isActive', headerName: 'Status', width: 100, type: 'boolean', renderCell: ActiveInactive },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    { field: 'createdAt', headerName: 'Created On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
    { field: 'updatedBy', headerName: 'Last Modified By', width: 150 },
    { field: 'updatedAt', headerName: 'Last Modified On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
];

const PackageType = () => {
    const { items, totalRecord } = useSelector(selectPackageTypeList);
    const dispatch = useDispatch();
    const loadListItems = useCallback(() => {
        dispatch(getPackageTypeList());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        loadListItems();
        return () => dispatch(resetPackageTypeList());
    }, [loadListItems, dispatch]);

    const handleAfterFormClose = (reload = false) => {
        if (!reload) {
            return;
        }
        loadListItems();
    }
    return (
        <Page
            title="Package Type | Master"
            legend="Package Type"
        >
            <AppDataGrid
                columns={columns}
                rows={items}
                keyField="name"
                title="Package Type"
                onFormSave={addPackageType}
                onFormUpdate={updatePackageType}
                afterFormClose={handleAfterFormClose}
                totalRecord={totalRecord}
            />
        </Page>
    )
}

export default PackageType;