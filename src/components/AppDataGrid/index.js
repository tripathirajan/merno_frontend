import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridColumnMenu,
    GridToolbarQuickFilter,
    GridLinkOperator
} from '@mui/x-data-grid';
import { Box, Paper, Stack, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoDataFound from '../SvgIcons/NoDataFound';
import MasterForm from '../MasterForm';
import icons from '../../config/icons';


const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    }
}));

const StyledDataGrid = styled((props) => <DataGrid  {...props} />)(({ theme }) => ({
    '& .MuiDataGrid-columnHeaders': {
        color: theme.palette.secondary.light,
        borderBottom: `2px solid ${theme.palette.secondary.light}`
    },
    '& .MuiDataGrid-columnHeader:focus': {
        outline: 'none'
    },
    '& .MuiDataGrid-cell': {
        borderBottom: `3px solid ${theme.palette.background.default}`,
        color: theme.palette.text.secondary
    },
    '& .MuiDataGrid-cell:focus': {
        outline: 'none'
    },
    '& .primary-col': {
        color: theme.palette.text.primary
    },
    '& .MuiDataGrid-pinnedColumns': {
        position: 'sticky',
        overflow: 'hidden',
        zIndex: 1,
        boxShadow: 2
    },
    '& .MuiDataGrid-pinnedColumns--left': {
        left: '0px',
        float: 'left'
    },
    '& .MuiDataGrid-cellContent': {
        fontSize: '0.8rem'
    }
}));

const StyledActionButton = styled((props) => <Button {...props} />)(({ theme }) => ({
    fontSize: '0.8rem'
}));

const StyledGridColumnMenu = styled(GridColumnMenu)(({ theme }) => ({
    fontSize: '0.8rem'
}))

const GridCustomToolbar = React.memo(({ showAddAction, handleAddClick, addActionLabel }) => {
    // console.log('GridCustomToolbar')
    return (
        <GridToolbarContainer sx={{ padding: 1 }}>
            <GridToolbarQuickFilter
                variant='outlined'
                size='small'
                color="secondary"
            />
            <Box sx={{ flexGrow: 1 }} />
            <GridToolbarFilterButton color="secondary" sx={{ ml: 1 }} />
            <GridToolbarExport color="secondary" sx={{ ml: 1 }} />
            {
                showAddAction && <StyledActionButton
                    color="secondary"
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={handleAddClick}
                    sx={{ ml: 1 }}
                >
                    {addActionLabel || 'Add'}
                </StyledActionButton>
            }
        </GridToolbarContainer>)
});

const CustomOverlay = () => {
    return (<StyledGridOverlay>
        <NoDataFound />
        <Box sx={{ mt: 1, color: 'text.secondary' }}>No data found!</Box>
    </StyledGridOverlay>)
}

const AppDataGrid = ({
    rows,
    columns,
    keyField = "",
    pinnedColumnState = {},
    onFormSave,
    onFormUpdate,
    afterFormClose,
    title,
    totalRecord,
    addActionLabel = '',
    disableForm = false,
    onAddClick,
    readOnly = false,
    menus = [],
    ...rest }) => {

    const [editData, setEditData] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [contextMenu, setContextMenu] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState();

    const handleRowDoubleClick = (params, event) => {
        if (disableForm) {
            event.preventDefault();
            return;
        }
        const { id, row } = params;
        setEditData({ id, ...row });
        setOpenModal(true);
    }
    const handleFormClose = (reload = false) => {
        setOpenModal(false);
        if (editData?.id) {
            setEditData({})
        }
        afterFormClose(reload)
    }
    const handleAddActionClick = () => {
        if (overrideAddAction) {
            onAddClick();
            return;
        }
        setOpenModal(true);
    }
    const handleContextMenu = (event) => {
        event.preventDefault();
        setSelectedRow(event?.currentTarget?.getAttribute('data-id'));
        setContextMenu(
            contextMenu === null
                ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
                : null,
        );
    };
    const handleClose = () => {
        setContextMenu(null);
    };

    useEffect(() => {
        if (contextMenu) {
            handleClose();
        }
        // eslint-disable-next-line
    }, []);

    const columnsWithSN = [{ field: 'sn', headerName: '#', width: 50, type: 'number', filterable: false }, ...columns];
    const rowsWithSN = rows?.map((item, index) => ({ sn: (index + 1), ...item }));
    const overrideAddAction = onAddClick && typeof onAddClick === 'function';
    disableForm = disableForm || overrideAddAction;

    let componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
        },
        row: {
            style: { cursor: 'pointer' },
        },
        filterPanel: {
            linkOperators: [GridLinkOperator.And, GridLinkOperator.Or],
            filterFormProps: {
                columnInputProps: {
                    variant: 'outlined',
                    size: 'small',
                    sx: { mt: 'auto', ml: 1 },
                },
                operatorInputProps: {
                    variant: 'outlined',
                    size: 'small',
                    sx: { mt: 'auto', ml: 1 },
                },
                valueInputProps: {
                    InputComponentProps: {
                        variant: 'outlined',
                        size: 'small',
                    },
                    sx: { mt: 'auto', ml: 1 }
                }
            }
        }
    }
    if (menus?.length) {
        componentProps.row["onContextMenu"] = handleContextMenu;
        componentProps.row["style"] = { cursor: 'context-menu' };
    }
    return (<>
        <Stack
            direction="column"
            spacing={1}
        >
            <Box component={Paper} sx={{ height: '75vh', width: '100%', p: 0 }} elevation={0}>
                <StyledDataGrid
                    disableSelectionOnClick={true}
                    checkboxSelection={true}
                    rows={rowsWithSN}
                    columns={columnsWithSN}
                    density="comfortable"
                    componentsProps={componentProps}
                    components={{
                        ColumnMenu: StyledGridColumnMenu,
                        NoRowsOverlay: CustomOverlay,
                        Toolbar: ({ setFilterButtonEl }) => <GridCustomToolbar showAddAction={!readOnly} setFilterButtonEl={setFilterButtonEl} addActionLabel={addActionLabel} handleAddClick={handleAddActionClick} />
                    }}
                    getCellClassName={(params) => {
                        return params?.field === keyField ? 'primary-col' : '';
                    }}
                    onRowDoubleClick={handleRowDoubleClick}
                    {...rest}
                />
                {
                    menus?.length && <ContextMenu menus={menus} contextMenu={contextMenu} handleClose={handleClose} selectedRow={selectedRow} />
                }
            </Box>
        </Stack>
        {
            !disableForm && openModal && <MasterForm
                title={editData?.id ? `Edit ${title}` : `New ${title}`}
                open={openModal}
                onFormClose={handleFormClose}
                formSaveAction={editData?.id ? onFormUpdate : onFormSave}
                data={editData}
            />
        }
    </>
    )
}

AppDataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    keyField: PropTypes.string,
    onFormSave: PropTypes.func,
    onFormUpdate: PropTypes.func,
    afterFormClose: PropTypes.func,
    title: PropTypes.string,
    totalRecord: PropTypes.number,
    addActionLabel: PropTypes.string,
    disableForm: PropTypes.bool,
    onAddClick: PropTypes.func,
    readOnly: PropTypes.bool,
}
export default React.memo(AppDataGrid);

const ContextMenu = ({ menus, contextMenu, selectedRow, handleClose }) => {
    return (<Menu
        variant='menu'
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
            contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
        }
        componentsProps={{
            root: {
                onContextMenu: (e) => {
                    e.preventDefault();
                    handleClose();
                },
            },
        }}
        MenuListProps={{
            dense: true
        }}

    >
        {
            menus && menus.map(({ displayTitle, icon, action }, index) => {
                const MenuIcon = icons[icon]
                return (<MenuItem key={index} onClick={() => {
                    if (action && typeof action === 'function') {
                        action(selectedRow)
                    }
                    handleClose()
                }}>
                    {icon && <ListItemIcon><MenuIcon /></ListItemIcon>}
                    <ListItemText>{displayTitle}</ListItemText>
                </MenuItem>)
            })
        }
    </Menu>);
}