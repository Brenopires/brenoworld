import React, { useEffect, useState, useCallback } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { travelHistory, userProfile } from '../data/content';

// Custom Dark Map Style (Snazzy Maps style or similar dark theme)
const darkMapStyle = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#000000" }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9e9e9e" }]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#bdbdbd" }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#181818" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#1b1b1b" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#2c2c2c" }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#8a8a8a" }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{ "color": "#373737" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{ "color": "#3c3c3c" }]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{ "color": "#4e4e4e" }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#000000" }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#3d3d3d" }]
    }
];

// List of target countries to highlight
// Mapping Portuguese names to likely GeoJSON 'admin' or 'name' properties
const targetCountries = [
    'United States of America', 'Brazil', 'Germany', 'Italy', 'Israel',
    'Turkey', 'China', 'Greece', 'United Kingdom', 'Czech Republic',
    'Slovakia', 'Netherlands', 'France', 'Spain', 'Portugal',
    'Argentina', 'Chile', 'Austria', 'Hungary', 'Belgium'
];

// Component to handle GeoJSON data layer interactions
const GeoJsonLayer = () => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // Fetch World GeoJSON (Low resolution for performance)
        fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
            .then(response => response.json())
            .then(data => {
                // Add GeoJSON to the map
                map.data.addGeoJson(data);

                // Style the data layer
                map.data.setStyle((feature) => {
                    const countryName = feature.getProperty('name');
                    const isTarget = targetCountries.includes(countryName) ||
                        (countryName === 'United States' && targetCountries.includes('United States of America'));

                    return {
                        fillColor: isTarget ? '#ffffff' : '#000000', // White for target, black for others
                        strokeColor: '#333333',
                        strokeWeight: 1,
                        fillOpacity: isTarget ? 1 : 0, // Solid white
                        clickable: false
                    };
                });
            });

        return () => {
            // Cleanup if needed (though map instance usually persists or unmounts completely)
            map.data.forEach((feature) => {
                map.data.remove(feature);
            })
        }

    }, [map]);

    return null;
};

const MapPage = () => {
    const visitedSet = new Set();
    travelHistory.forEach(yearGroup => {
        yearGroup.destinations.forEach(dest => visitedSet.add(dest.country));
    });

    // Add other target countries that might not be in the explicit timeline but are mentioned in the list
    targetCountries.forEach(c => visitedSet.add(c));

    const visitedCount = visitedSet.size;
    const progressPercent = Math.round((visitedCount / userProfile.targetWorldTour) * 100);
    const age = userProfile.currentYear - userProfile.birthYear;

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
                <Map
                    defaultCenter={{ lat: 20, lng: 0 }}
                    defaultZoom={2}
                    styles={darkMapStyle}
                    disableDefaultUI={true}
                    style={{ width: '100%', height: '100%' }}
                    backgroundColor={'#000000'}
                >
                    <GeoJsonLayer />
                </Map>
            </APIProvider>

            {/* Sidebar Overlay */}
            <div className="travel-sidebar" style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                bottom: '20px',
                width: '320px',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1001,
                overflowY: 'auto'
            }}>
                <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Volta ao Mundo</h2>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>
                        Nascido em {userProfile.birthYear} • {age} anos
                    </p>

                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                            <span>Progresso</span>
                            <span style={{ color: '#fff', fontWeight: 'bold' }}>{progressPercent}%</span>
                        </div>
                        <div style={{ height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${progressPercent}%`,
                                height: '100%',
                                background: '#fff',
                                transition: 'width 1s ease-out'
                            }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem' }}>
                        <div>
                            <div style={{ color: '#888', marginBottom: '4px' }}>Realizado</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>{visitedCount}</div>
                        </div>
                        <div>
                            <div style={{ color: '#888', marginBottom: '4px' }}>Faltam</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>{userProfile.targetWorldTour - visitedCount}</div>
                        </div>
                    </div>
                </div>

                <div className="timeline">
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '24px' }}>Histórico</h3>
                    {travelHistory.slice().reverse().map((entry) => (
                        <div key={entry.year} style={{
                            position: 'relative',
                            paddingLeft: '24px',
                            marginBottom: '24px',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <div style={{
                                position: 'absolute',
                                left: '-5px',
                                top: '0',
                                width: '9px',
                                height: '9px',
                                background: '#fff',
                                borderRadius: '50%',
                                border: '2px solid #000'
                            }} />
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>{entry.year}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {entry.destinations.map((dest, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.85rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        color: '#ccc'
                                    }}>
                                        {dest.name}{dest.month ? ` (${dest.month})` : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
                <a href="/" className="btn btn-outline" style={{
                    background: 'rgba(0,0,0,0.5)',
                    borderColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(4px)',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                }}>Back to Home</a>
            </div>
        </div>
    );
};

export default MapPage;
