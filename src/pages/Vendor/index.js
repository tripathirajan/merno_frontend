import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppDataGrid from '../../components/AppDataGrid';
import Page from '../../components/Page';
import ActiveInactive from '../../components/Renderer/ActiveInactive';
import DateTimeRenderer from '../../components/Renderer/DateTimeRenderer';
import ProfileRenderer from '../../components/Renderer/ProfileRenderer';
import { getVendorList } from '../../storage/actions/vendorAction';
import { resetVendorList, selectVendorList } from '../../storage/slices/vendorSlice';


const columns = [
    {
        field: 'name', headerName: 'Vendor', width: 300, renderCell: ({ row }) => {
            const { id, name, address, image } = row;
            return <ProfileRenderer title={name} img={image} subtitle1={address} redirectURL={`view/${id}`} />
        }
    },
    { field: 'email', headerName: 'Vendor Email', width: 200 },
    { field: 'contactNo', headerName: 'Contact No.', width: 150 },
    { field: 'isActive', headerName: 'Status', width: 100, type: 'boolean', renderCell: ActiveInactive },
    {
        field: 'contactPersonName', headerName: 'Contact Person', width: 250, renderCell: ({ row }) => {
            const { contactPersonName, contactPersonEmail } = row;
            return <ProfileRenderer title={contactPersonName} subtitle1={contactPersonEmail} />
        }
    },
    { field: 'contactPersonMobile', headerName: 'Contact Person Mob.', width: 200 },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    { field: 'createdAt', headerName: 'Created On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
    { field: 'updatedBy', headerName: 'Last Modified By', width: 150 },
    { field: 'updatedAt', headerName: 'Last Modified On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
];

const Vendor = () => {
    const navigate = useNavigate();
    const { items, totalRecord } = useSelector(selectVendorList);
    const dispatch = useDispatch();

    const loadVendorList = useCallback(() => {
        dispatch(getVendorList());
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        loadVendorList();
        return () => dispatch(resetVendorList());
    }, [loadVendorList, dispatch]);

    const contextMenus = [
        {
            displayTitle: 'View',
            icon: 'view',
            action: function (id) {
                if (id) {
                    navigate(`view/${id}`)
                }
            }
        },
        {
            displayTitle: 'Edit',
            icon: 'edit',
            action: function (id) {
                if (id) {
                    navigate(`edit/${id}`)
                }
            }
        }
    ];
    return (
        <Page
            title="Vendor | Merno"
            legend={`Vendors`}
        >
            <AppDataGrid
                columns={columns}
                rows={items}
                disableForm={true}
                addActionLabel="Add Vendor"
                onAddClick={() => {
                    navigate('add')
                }}
                totalRecord={totalRecord}
                menus={contextMenus}
            />
        </Page>
    )
}

export default Vendor;