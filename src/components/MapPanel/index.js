import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { Typography, } from '@mui/material';
import { GOOGLE_MAPS_API_KEY } from '../../constants';

const mapStyles = {
    height: "40vh",
    width: "100%",
    borderRadius: '12px'
};

const mapOptions = {
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
};

const MapPanel = props => {
    const { lat, lng } = props;
    const { isLoaded, loadError } = useJsApiLoader(mapOptions);
    const position = { lat, lng }

    const RenderContent = React.memo(() => {
        if (loadError) return <Typography variant='body2'>Unable to load map.</Typography>;

        return isLoaded ? <>
            < GoogleMap
                mapContainerStyle={mapStyles}
                zoom={15}
                center={position}
            >
                <MarkerF
                    position={position}
                    draggable={false}
                />
            </GoogleMap > </> : <Typography variant='body2'>Loading map...</Typography>;
    });

    return <RenderContent />
}

MapPanel.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number
}



export default React.memo(MapPanel);