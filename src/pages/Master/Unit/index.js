import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../../components/Page';
import AppDataGrid from '../../../components/AppDataGrid';
import DateTimeRenderer from '../../../components/Renderer/DateTimeRenderer';
import ActiveInactive from '../../../components/Renderer/ActiveInactive';
import { addUnit, getUnitList, updateUnit } from '../../../storage/actions/masterAction';
import { resetUnitList, selectUnitList } from '../../../storage/slices/masterSlice';


const columns = [
    { field: 'name', headerName: 'Unit', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'isActive', headerName: 'Status', width: 100, type: 'boolean', renderCell: ActiveInactive },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    { field: 'createdAt', headerName: 'Created On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
    { field: 'updatedBy', headerName: 'Last Modified By', width: 150 },
    { field: 'updatedAt', headerName: 'Last Modified On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
];

const Unit = () => {

    const { items, totalRecord } = useSelector(selectUnitList);
    const dispatch = useDispatch();
    const loadListItems = useCallback(() => {
        dispatch(getUnitList());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        loadListItems();
        return () => dispatch(resetUnitList());
    }, [loadListItems, dispatch]);

    const handleAfterFormClose = (reload = false) => {
        if (!reload) {
            return;
        }
        loadListItems();
    }

    return (
        <Page
            title="Unit | Master"
            legend="Units"
        >
            <AppDataGrid
                columns={columns}
                rows={items}
                keyField="name"
                title="Unit"
                onFormSave={addUnit}
                onFormUpdate={updateUnit}
                afterFormClose={handleAfterFormClose}
                totalRecord={totalRecord}
            />
        </Page>
    )
}

export default Unit;