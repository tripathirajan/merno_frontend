import React, { useCallback, useEffect } from 'react'
import Page from '../../components/Page';
import AppDataGrid from '../../components/AppDataGrid';
import ProfileRenderer from '../../components/Renderer/ProfileRenderer';
import ActiveInactive from '../../components/Renderer/ActiveInactive';
import DateTimeRenderer from '../../components/Renderer/DateTimeRenderer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserList } from '../../storage/slices/userSlice';
import { getUserList } from '../../storage/actions/userAction';

const columns = [
    {
        field: 'fullName', headerName: 'Name', width: 300, renderCell: ({ row }) => {
            const { id, fullName, username, image } = row;
            return <ProfileRenderer title={fullName} img={image} subtitle1={username} redirectURL={`view/${id}`} />
        }
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'isActive', headerName: 'Status', width: 100, type: 'boolean', renderCell: ActiveInactive },
    {
        field: 'roles', headerName: 'Roles', width: 200,
        renderCell: ({ row }) => {
            return row?.roles?.join(',');
        }
    },
    {
        field: 'createdBy', headerName: 'Created By', width: 150, renderCell: ({ row }) => {
            return row?.updatedBy?.fullName || 'N/A';
        }
    },
    { field: 'createdAt', headerName: 'Created On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
    {
        field: 'updatedBy', headerName: 'Last Modified By', width: 150,
        renderCell: ({ row }) => {
            return row?.updatedBy?.fullName || 'N/A';
        }
    },
    { field: 'updatedAt', headerName: 'Last Modified On', width: 160, type: 'dateTime', renderCell: DateTimeRenderer },
];

const Users = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector(selectUserList);
    const loadUserList = useCallback((forceload = false) => {
        dispatch(getUserList());
    }, [dispatch])

    useEffect(() => {
        loadUserList();
        // eslint-disable-next-line
    }, [])

    const handleReloadList = useCallback(() => {
        loadUserList();
        // eslint-disable-next-line
    }, []);
    return (
        <Page
            title="Users | Merno"
            legend={`Users`}
        >
            <AppDataGrid
                columns={columns}
                rows={items}
                disableForm={true}
                addActionLabel="Add User"
                onAddClick={() => {
                    navigate('add')
                }}
                totalRecord={0}
                onReload={handleReloadList}
            />
        </Page>
    )
}

export default Users;