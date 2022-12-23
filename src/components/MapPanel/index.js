// import React, { useState, useEffect, useCallback } from 'react'
// import PropTypes from 'prop-types'
// import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
// import { Stack, TextField, Typography, Autocomplete } from '@mui/material';
// import { GOOGLE_MAPS_API_KEY } from '../../constants';
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";

// const mapStyles = {
//     height: "50vh",
//     width: "100%"
// };

// const defaultCenter = {
//     lat: 41.3851, lng: 2.1734
// }
// const mapOptions = {
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//     libraries: ['places']
// };

// const MapPanel = props => {
//     const { fieldProps, showAutoComplete = true, onMarkerMoved } = props;
//     const [currentPosition, setCurrentPosition] = useState(defaultCenter);
//     const { isLoaded, loadError } = useJsApiLoader(mapOptions);

//     const onMarkerDragEnd = (e) => {
//         const lat = e.latLng.lat();
//         const lng = e.latLng.lng();
//         setCurrentPosition({ lat, lng })
//         if (onMarkerMoved && typeof onMarkerMoved === 'function') {
//             onMarkerMoved(e);
//         }
//     };

//     const success = useCallback(position => {
//         const currentLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//         }
//         setCurrentPosition(currentLocation);
//     }, []);

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(success);
//         // eslint-disable-next-line
//     }, [])

//     const RenderContent = React.memo(() => {
//         if (loadError) return <Typography variant='body2'>Unable to load map.</Typography>;

//         return isLoaded ? <>
//             {
//                 showAutoComplete && <AutoCompleteField />
//             }
//             < GoogleMap
//                 mapContainerStyle={mapStyles}
//                 zoom={15}
//                 center={currentPosition}
//             >
//                 <MarkerF
//                     position={currentPosition}
//                     onDragEnd={(e) => onMarkerDragEnd(e)}
//                     draggable={true}
//                 />
//             </GoogleMap > </> : <Typography variant='body2'>Loading map...</Typography>;
//     });

//     return (
//         <Stack
//             direction="column"
//             alignItems="center"
//             justifyContent="center"
//             spacing={2}
//         >
//             <RenderContent />
//         </Stack>
//     )
// }

// MapPanel.propTypes = {
//     lat: PropTypes.number,
//     lng: PropTypes.number
// }

// const AutoCompleteField = ({ handleAddressChange }) => {

//     const {
//         ready,
//         value,
//         setValue,
//         suggestions,
//         clearSuggestions,
//     } = usePlacesAutocomplete({
//         debounce: 300,
//     });
//     const { status, data } = suggestions;

//     console.log('autocompletedata', status, data, suggestions, ready, value);

//     const handleOnChangeAddress = async (e) => {
//         console.log('handle address change', e)
//         // setValue(address, false);
//         // clearSuggestions();

//         // const results = await getGeocode({ address });
//         // const { lat, lng } = await getLatLng(results[0]);
//         // setSelected({ lat, lng });
//     }
//     return (<><Autocomplete
//         fullWidth
//         options={data}
//         autoHighlight
//         size="small"
//         renderInput={(params) => (
//             <TextField
//                 {...params}
//                 label="Search for Address"
//                 inputProps={{
//                     ...params.inputProps,
//                     autoComplete: 'address', // disable autocomplete and autofill
//                 }}
//             />
//         )}
//         disabled={!ready}
//         value={value}
//         onChange={handleOnChangeAddress}
//     /></>)
// }


// export default React.memo(MapPanel);