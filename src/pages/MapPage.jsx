import React, { useEffect, useState, useCallback } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { userProfile } from '../data/content';
import { useLanguage } from '../hooks/LanguageContext';

// Custom Dark Map Style
const darkMapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
    { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
    { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
    { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
    { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
    { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
    { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1b1b1b" }] },
    { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] },
    { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#373737" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#3c3c3c" }] },
    { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#4e4e4e" }] },
    { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
    { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#3d3d3d" }] }
];

// List of target countries to highlight is now driven by database trips

const GeoJsonLayer = ({ dynamicCountries, dbTrips, setSelectedCountry, setHoveredCountry }) => {
    const map = useMap();
    const [geoDataLoaded, setGeoDataLoaded] = useState(false);

    // Helper function para verificar se país foi visitado
    const isCountryVisited = (countryName) => {
        return dynamicCountries.includes(countryName) ||
            (countryName === 'United States' && dynamicCountries.includes('United States of America'));
    };

    // Effect 1: Carregar GeoJSON uma única vez
    useEffect(() => {
        if (!map) return;

        fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
            .then(response => response.json())
            .then(data => {
                map.data.addGeoJson(data);
                setGeoDataLoaded(true);
            })
            .catch(err => console.error('Error loading GeoJSON:', err));

        return () => {
            map.data.forEach((feature) => { map.data.remove(feature); });
        };
    }, [map]);

    // Effect 2: Aplicar styling quando dynamicCountries mudar
    useEffect(() => {
        if (!map || !geoDataLoaded) return;

        map.data.setStyle((feature) => {
            const countryName = feature.getProperty('name');
            const isTarget = isCountryVisited(countryName);

            return {
                fillColor: isTarget ? '#ffffff' : '#000000',
                strokeColor: '#333333',
                strokeWeight: 1,
                fillOpacity: isTarget ? 1 : 0,
                clickable: isTarget
            };
        });
    }, [map, dynamicCountries, geoDataLoaded]);

    // Effect 3: Event listeners
    useEffect(() => {
        if (!map || !geoDataLoaded) return;

        // Click listener
        const clickListener = map.data.addListener('click', (event) => {
            const countryName = event.feature.getProperty('name');
            const trips = dbTrips.filter(trip =>
                trip.country === countryName ||
                (countryName === 'United States' && trip.country === 'United States of America')
            );

            if (trips.length > 0) {
                setSelectedCountry({ name: countryName, trips });
            }
        });

        // Mouseover listener
        const mouseoverListener = map.data.addListener('mouseover', (event) => {
            const countryName = event.feature.getProperty('name');

            if (isCountryVisited(countryName)) {
                map.data.overrideStyle(event.feature, {
                    fillOpacity: 0.8,
                    strokeWeight: 2
                });

                const trip = dbTrips.find(t =>
                    t.country === countryName ||
                    (countryName === 'United States' && t.country === 'United States of America')
                );
                const displayName = trip?.display_name || countryName;
                setHoveredCountry(displayName);
            }
        });

        // Mouseout listener
        const mouseoutListener = map.data.addListener('mouseout', (event) => {
            map.data.revertStyle(event.feature);
            setHoveredCountry(null);
        });

        // Cleanup correto no escopo do useEffect
        return () => {
            if (clickListener) window.google.maps.event.removeListener(clickListener);
            if (mouseoverListener) window.google.maps.event.removeListener(mouseoverListener);
            if (mouseoutListener) window.google.maps.event.removeListener(mouseoutListener);
        };
    }, [map, geoDataLoaded, dbTrips, dynamicCountries, setSelectedCountry, setHoveredCountry]);

    return null;
};

const CountryDetailsModal = ({ country, onClose }) => {
    if (!country) return null;

    // Group trips by year
    const tripsByYear = country.trips.reduce((acc, trip) => {
        if (!acc[trip.year]) acc[trip.year] = [];
        acc[trip.year].push(trip);
        return acc;
    }, {});

    const years = Object.keys(tripsByYear).sort((a, b) => b - a);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }} onClick={onClose}>
            <div style={{
                background: '#111',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '2rem',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto'
            }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>
                        {country.trips[0].display_name}
                    </h2>
                    <button onClick={onClose} style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.25rem'
                    }}>×</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {years.map(year => (
                        <div key={year} style={{ borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{year}</span>
                                {tripsByYear[year].some(t => t.month) && (
                                    <span style={{ color: '#666' }}>
                                        {tripsByYear[year].map(t => t.month).filter(Boolean).join(', ')}
                                    </span>
                                )}
                            </div>
                            {tripsByYear[year].map((trip, idx) => (
                                trip.description && (
                                    <p key={idx} style={{ margin: '0.5rem 0 0 0', color: '#aaa', fontSize: '0.9rem' }}>
                                        {trip.description}
                                    </p>
                                )
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MapPage = () => {
    const { t, language } = useLanguage();
    const [dbTrips, setDbTrips] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState(null);

    useEffect(() => {
        fetch('/api/trips')
            .then(res => res.json())
            .then(data => setDbTrips(data.results || []))
            .catch(err => console.error('Error loading trips:', err));
    }, []);

    const mergedHistory = [];
    dbTrips.forEach(trip => {
        let yearEntry = mergedHistory.find(h => h.year === trip.year);
        const destination = { country: trip.country, name: trip.display_name, month: trip.month };
        if (yearEntry) {
            yearEntry.destinations.push(destination);
        } else {
            mergedHistory.push({ year: trip.year, destinations: [destination] });
        }
    });
    // Sort merged history by year
    mergedHistory.sort((a, b) => a.year - b.year);

    const visitedSet = new Set();
    mergedHistory.forEach(yearGroup => {
        yearGroup.destinations.forEach(dest => visitedSet.add(dest.country));
    });

    const dynamicCountries = [...new Set(dbTrips.map(t => t.country))];

    const visitedCount = visitedSet.size;
    const progressPercent = Math.round((visitedCount / userProfile.targetWorldTour) * 100);
    const age = userProfile.currentYear - userProfile.birthYear;

    const getLocalized = (dest, field) => {
        if (dest[language] && dest[language][field]) return dest[language][field];
        return dest[field] || "";
    };

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
                    <GeoJsonLayer
                        dynamicCountries={dynamicCountries}
                        dbTrips={dbTrips}
                        setSelectedCountry={setSelectedCountry}
                        setHoveredCountry={setHoveredCountry}
                    />
                </Map>
            </APIProvider>

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
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>{t('map.title')}</h2>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>
                        {t('map.bornIn')} {userProfile.birthYear} • {age} {t('map.yearsOld')}
                    </p>

                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                            <span>{t('map.progress')}</span>
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
                            <div style={{ color: '#888', marginBottom: '4px' }}>{t('map.done')}</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>{visitedCount}</div>
                        </div>
                        <div>
                            <div style={{ color: '#888', marginBottom: '4px' }}>{t('map.left')}</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>{userProfile.targetWorldTour - visitedCount}</div>
                        </div>
                    </div>
                </div>

                <div className="timeline">
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '24px' }}>{t('map.timeline')}</h3>
                    {mergedHistory.slice().reverse().map((entry) => (
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
                                        {getLocalized(dest, 'name')}{getLocalized(dest, 'month') ? ` (${getLocalized(dest, 'month')})` : ''}
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
                }}>{t('nav.backHome')}</a>
            </div>

            {hoveredCountry && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#000',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    zIndex: 999,
                    pointerEvents: 'none'
                }}>
                    {hoveredCountry}
                </div>
            )}

            {selectedCountry && (
                <CountryDetailsModal
                    country={selectedCountry}
                    onClose={() => setSelectedCountry(null)}
                />
            )}
        </div>
    );
};

export default MapPage;
