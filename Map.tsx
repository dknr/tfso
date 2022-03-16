import React, {useState} from 'react';
import MapboxGL from 'mapbox-gl';

const Map = () => {
    const map = React.useRef<MapboxGL.Map>();
    const mapContainer = React.useRef<HTMLDivElement>();
    const [zoom, _setZoom] = useState(8);
    const setZoom = (value: typeof zoom) => {
        map.current?.setZoom(value);
        _setZoom(value);
    };

    const [center, _setCenter] = useState<[number, number]>([-111.3,34.2]);
    const setCenter = (value: typeof center) => {
        map.current?.setCenter(value);
        _setCenter(value);
    };

    React.useEffect(() => {
        if (map.current) return;
        map.current = new MapboxGL.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            zoom, center,
        });
    });

    React.useEffect(() => {
        if (!map.current) return;
        map.current.on('moveend', () => {
            const {lng,lat} = map.current.getCenter();
            setCenter([lng,lat]);
            setZoom(map.current.getZoom());
        });
    }, [map.current]);

    React.useEffect(() => {
        map.current.add
    }, [map.current]);

    return (
        <div>
            <div ref={mapContainer} style={{width: 400, height: 400}}/>
            <div>
                <pre>{center}</pre>
                <pre>{zoom}</pre>
            </div>
        </div>
    );
}

export default Map;
