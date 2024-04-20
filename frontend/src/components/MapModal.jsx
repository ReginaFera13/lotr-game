import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, useAdvancedMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MapModal(props) {
    const { handleEnterChapter } = props;
    const [infowindowShown, setInfowindowShown] = useState(null);
    const [mapZoom, setMapZoom] = useState(7.5);
    const [overlayVisible, setOverlayVisible] = useState(true);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    const toggleInfoWindow = (markerId) => {
        setInfowindowShown(markerId === infowindowShown ? null : markerId);
    };

    const closeInfoWindow = () => setInfowindowShown(null);

    const markers = [
        { id: '1', 'position': { 'lat': 39.48, 'lng': -7.86 }, 'title': 'Chapter 1 - The Shire' },
        { id: '2', 'position': { 'lat': 39.46, 'lng': -7.6 }, 'title': 'Chapter 2 - The Old Forest' },
        { id: '3', 'position': { 'lat': 39.46, 'lng': -7.4 }, 'title': 'Chapter 3 - Bree' },
        { id: '4', 'position': { 'lat': 39.5, 'lng': -7 }, 'title': 'Chapter 4 - The Road to Rivendell' },
        { id: '5', 'position': { 'lat': 39.53, 'lng': -6.35 }, 'title': 'Chapter 5 - Rivendell' },
        { id: '6', 'position': { 'lat': 39.05, 'lng': -6.5 }, 'title': 'Chapter 6 - Moria' },
        { id: '7', 'position': { 'lat': 38.95, 'lng': -6.15 }, 'title': 'Chapter 7 - Lothlórien' },
        { id: '8', 'position': { 'lat': 38.6, 'lng': -5.7 }, 'title': 'Chapter 8 - The Great River' },
        { id: '9', 'position': { 'lat': 38.23, 'lng': -5.6 }, 'title': 'Chapter 9 - Parth Galen' },
        { id: '10', 'position': { 'lat': 38.13, 'lng': -6.3 }, 'title': 'Chapter 10 - Edoras' },
        { id: '11', 'position': { 'lat': 38.2, 'lng': -6.4 }, 'title': 'Chapter 11 - Helm\'s Deep' },
        { id: '12', 'position': { 'lat': 38.5, 'lng': -6.75 }, 'title': 'Chapter 12 - Isengard' },
        { id: '13', 'position': { 'lat': 37.85, 'lng': -5.3 }, 'title': 'Chapter 13 - Minas Tirith' },
        { id: '14', 'position': { 'lat': 37.8, 'lng': -5.11 }, 'title': 'Chapter 14 - The Black Gate' },
        { id: '15', 'position': { 'lat': 37.98, 'lng': -4.9 }, 'title': 'Chapter 15 - Mount Doom' },
       
    ]

    const handleEnterChapterClick = (markerId) => {
        props.onEnterChapter(markerId);
    };

    return (
        <Modal {...props} fullscreen={true}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Map</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='flex-center relative'>
                    <p>Overlay must be toggled off to use the map.</p>
                    <Button variant="outline-success" onClick={toggleOverlay}>Toogle Overlay</Button>
                </div>
                <div className='flex-center relative'>
                    {overlayVisible && (
                        <img id='overlay' className='overlay-size absolute z-2 left' src="/src/assets/middle_earth_map_overlay.png" alt="middle earth map overlay" />
                    )}
                    <APIProvider apiKey={'AIzaSyBxvhkDu9gaszAmTVBWxgonv0Q6LWEGxoA'}>
                        <Map 
                            defaultCenter={{lat: 38.608884836841014, lng: -6.637687521029093}}
                            zoom={mapZoom}
                            onZoomChange={(newZoom) => setMapZoom(newZoom)}
                            gestureHandling={'none'}
                            disableDefaultUI={true}
                            mapId={'f7619db04272b7a7'} // Add your map ID here
                            className='map-size z-1'
                        >
                            {markers.map(marker => (
                                <React.Fragment key={marker.id}>
                                    <AdvancedMarker 
                                        position={marker.position}
                                        title={marker.title}
                                        className='z-3'
                                        onClick={() => toggleInfoWindow(marker.id)}
                                    />
                                    {infowindowShown === marker.id && (
                                        <InfoWindow
                                            position={marker.position}
                                            onCloseClick={closeInfoWindow}
                                        >
                                            <h1>{marker.title}</h1>
                                            <Button variant="outline-success" onClick={() => handleEnterChapterClick(marker.id)}>Enter Chapter</Button>
                                        </InfoWindow>
                                    )}
                                </React.Fragment>
                            ))}
                        </Map>
                    </APIProvider>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default MapModal;