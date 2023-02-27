import React, { useCallback, useEffect, useState } from 'react'
import Page from '../../components/Page';
import Label from '../../components/Label';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Avatar, Card, CardContent, CardHeader,
    List, Stack, Typography, ListSubheader,
    ListItem, ListItemText, ListItemIcon, Portal
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getVendorInfo } from '../../storage/actions/vendorAction';
import { resetVendorInfo, selectVendorInfo } from '../../storage/slices/vendorSlice';
import MapPanel from '../../components/MapPanel';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import PermContactCalendarTwoToneIcon from '@mui/icons-material/PermContactCalendarTwoTone';
import ImageViewer from 'react-simple-image-viewer';

const status = {
    success: {
        label: "Active",
        labelColor: 'success'
    },
    error: {
        label: "In-Active",
        labelColor: 'error'
    }
}
const imageViewerStyle = {
    zIndex: 1400,
    backgroundColor: 'rgb(0 0 0 / 81%)'
}

const ViewVendor = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { vendorId } = useParams();
    const { name, address, image, lat, lng, contactNo, email, isActive,
        contactPersonName,
        contactPersonEmail,
        contactPersonMobile
    } = useSelector(selectVendorInfo);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const { label, labelColor } = status[isActive ? "success" : "error"];

    const handleGoBack = () => {
        navigate(-1);
    }
    const loadVendorInfo = useCallback(() => {
        dispatch(getVendorInfo(vendorId));
    }, [vendorId, dispatch]);

    const handleCloseImageViewer = () => {
        setIsViewerOpen(false);
    };
    const handleOpenImageViewer = useCallback(() => {
        setIsViewerOpen(true);
    }, []);

    useEffect(() => {
        loadVendorInfo();
        return () => dispatch(resetVendorInfo())
    }, [loadVendorInfo, dispatch]);

    return (
        <Page
            title="Vendor | Merno"
            legend={`View Vendor`}
            onBackClick={handleGoBack}
        >
            <Card>
                <CardHeader
                    title={<Stack spacing={1} direction="row"><Typography color="primary" variant='h6'>{name || 'N/A'}</Typography><Label color={labelColor} variant="ghost">{label}</Label></Stack>}
                    subheader={<Typography sx={{ color: 'text.secondary' }} variant='body2'>{address || ''}</Typography>}
                    avatar={<Avatar
                        title="Click to view image"
                        src={image}
                        variant="rounded"
                        alt={name}
                        sx={{ width: 56, height: 56, cursor: 'pointer' }}
                        onClick={handleOpenImageViewer}
                    >
                        {name}
                    </Avatar>}
                    disableTypography
                />
                <CardContent>
                    <Stack
                        direction="column"
                        spacing={2}
                    >
                        {
                            lat && lng ? <MapPanel lat={lat} lng={lng} /> : null
                        }
                        <List
                            subheader={<ListSubheader sx={{ color: 'text.primary' }}>Basic Info</ListSubheader>}

                        >
                            <ListItem divider>
                                <ListItemIcon><MailTwoToneIcon /></ListItemIcon>
                                <ListItemText primary={email} secondary="Email" />
                            </ListItem>
                            <ListItem divider>
                                <ListItemIcon><CallTwoToneIcon /></ListItemIcon>
                                <ListItemText primary={contactNo} secondary="Mobile No." />
                            </ListItem>
                            <ListItem divider>
                                <ListItemIcon><PermContactCalendarTwoToneIcon /></ListItemIcon>
                                <ListItemText primary={contactPersonName} secondary="Contact Person" />
                            </ListItem>
                            <ListItem divider>
                                <ListItemIcon><MailTwoToneIcon /></ListItemIcon>
                                <ListItemText primary={contactPersonEmail} secondary="Contact Person Email" />
                            </ListItem>
                            <ListItem divider>
                                <ListItemIcon><CallTwoToneIcon /></ListItemIcon>
                                <ListItemText primary={contactPersonMobile} secondary="Contact Person Mobile No." />
                            </ListItem>
                        </List>
                    </Stack>

                </CardContent>
            </Card>
            {
                isViewerOpen && <Portal><ImageViewer
                    src={[image]}
                    currentIndex={0}
                    disableScroll={false}
                    closeOnClickOutside={false}
                    onClose={handleCloseImageViewer}
                    backgroundStyle={imageViewerStyle}
                />
                </Portal>
            }

        </Page>
    )
}

export default ViewVendor;