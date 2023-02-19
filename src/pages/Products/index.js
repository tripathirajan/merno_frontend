import { Stack } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import AppDataGrid from '../../components/AppDataGrid'
import Page from '../../components/Page'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetProductList, selectProductList } from '../../storage/slices/productSlice';
import { getProductList } from '../../storage/actions/productAction';
import DateTimeRenderer from '../../components/Renderer/DateTimeRenderer';
import ProfileRenderer from '../../components/Renderer/ProfileRenderer';
import ActiveInactive from '../../components/Renderer/ActiveInactive';
import LinkRenderer from '../../components/Renderer/LinkRenderer';


const columns = [
    {
        field: 'productName', headerName: 'Product', width: 300,
        renderCell: ({ row }) => {
            const { id, productName, sku, image } = row;
            return <ProfileRenderer title={productName} img={image} subtitle1={sku} redirectURL={`view/${id}`} />
        }
    },
    { field: 'upc', headerName: 'UPC', width: 150 },
    { field: 'isActive', headerName: 'Status', width: 100, type: 'boolean', renderCell: ActiveInactive },
    {
        field: 'brand', headerName: 'Brand', width: 150,
        renderCell: ({ row }) => {
            return row?.brand?.name || 'N/A';
        }
    },
    {
        field: 'productCategory', headerName: 'Category', width: 150,
        renderCell: ({ row }) => {
            return row?.productCategory?.name || 'N/A';
        }
    },
    {
        field: 'stock', headerName: 'Stock', width: 150, type: 'number',
        renderCell: ({ row }) => {
            return `${row?.stock} ${row?.unit?.name}` || 'N/A';
        }
    },
    {
        field: 'regularPrice', headerName: 'Regular Price', width: 150, type: 'number',
        renderCell: ({ row }) => {
            const { regularPrice, currency: { name } } = row;
            return `${regularPrice} ${name}` || 'N/A';
        }
    },
    {
        field: 'salePrice', headerName: 'Sale Price', width: 150, type: 'number',
        renderCell: ({ row }) => {
            const { salePrice, currency: { name } } = row;
            return `${salePrice} ${name}` || 'N/A';
        }
    },
    {
        field: 'vendor', headerName: 'Vendor', width: 150,
        renderCell: ({ row }) => {
            const { vendor } = row || {};
            const { name, _id: id } = vendor;
            if (!id) {
                return name;
            }
            return (name && <LinkRenderer text={name} url={`/vendor/view/${id}`} />) || 'N/A';
        }
    },
    {
        field: 'createdBy', headerName: 'Created By', width: 150,
        renderCell: ({ row }) => {
            return row?.createdBy?.fullName || 'N/A';
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

const ProductList = () => {
    const { items } = useSelector(selectProductList);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadProductList = useCallback(() => {
        dispatch(getProductList())
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        loadProductList();
        return () => dispatch(resetProductList());
    }, [loadProductList, dispatch]);

    const handleReloadList = useCallback(() => {
        loadProductList()
    }, []);
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
                    rows={items}
                    columns={columns}
                    disableForm={true}
                    addActionLabel="Add Product"
                    onAddClick={() => {
                        navigate('add')
                    }}
                    onReload={handleReloadList}
                />
            </Stack>
        </Page>
    )
}

export default ProductList