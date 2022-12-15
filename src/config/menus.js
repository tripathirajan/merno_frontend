
const menus = [
    {
        title: 'App',
        path: '',
        icon: '',
        children: [
            {
                title: 'dashboard',
                path: '/dashboard',
                icon: 'dashboard'
            },
            {
                title: 'Product',
                path: '/product',
                icon: 'product'
            },
            {
                title: 'Vendor',
                path: '/vendor',
                icon: 'vendor'
            },
            {
                title: 'User',
                path: '/user',
                icon: 'user'
            },
        ]
    },
    {
        title: 'Master',
        path: '',
        icon: '',
        children: [
            {
                title: 'Product Category',
                path: '/product-category',
                icon: 'productCategory'
            },
            {
                title: 'Brand',
                path: '/brand',
                icon: 'brand'
            },
            {
                title: 'Package Type',
                path: '/package-type',
                icon: 'packageType'
            },
            {
                title: 'Currency',
                path: '/currency',
                icon: 'currency'
            },
            {
                title: 'Unit',
                path: '/unit',
                icon: 'unit'
            }
        ]
    }
]

export default menus;