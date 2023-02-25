import { Stack, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Page from '../../components/Page'
import AppPaper from '../../components/AppPaper'
import { selectUserInfo } from '../../storage/slices/authSlice'

const cardItems = [
    {
        title: 'Products',
        subtitle: 'Total',
        value: 12,
        variant: 'light',
    },
    {
        title: 'Orders',
        subtitle: 'today',
        value: 30,
        variant: 'light',
    },
    {
        title: 'Orders',
        subtitle: 'last month',
        value: 30,
        variant: 'light',
    },
    {
        title: 'Products',
        subtitle: 'Total',
        value: 12,
        variant: 'dark'
    }
]

const Dashboard = () => {
    const { fullName } = useSelector(selectUserInfo)
    return (
        <Page
            title="Dashboard | Merno"
            legend={` Welcome ${fullName} !`}
            subtitle="Checkout latest update on your account"
        >
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
            >
                <Grid container spacing={2}>
                    {
                        cardItems.map(({ title, subtitle, value, ...rest }, index) => {
                            const isDarkMode = rest?.variant === "dark";
                            return (
                                <Grid key={index} xs={12} md={3} lg={3} item>
                                    <AppPaper {...rest}>
                                        <Typography variant='subtitle2' color={isDarkMode ? 'white' : 'text.primary'}>
                                            {title}
                                        </Typography>
                                        <Typography variant='caption' color={isDarkMode ? 'white' : 'text.secondary'}>
                                            {subtitle}
                                        </Typography>
                                        <Typography variant='h3' color={isDarkMode ? 'white' : 'primary'}>
                                            {value}
                                        </Typography>
                                    </AppPaper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Stack>
        </Page>
    )
}

export default Dashboard