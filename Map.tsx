import React, {useState} from 'react';
import MapboxGL, {Marker, NavigationControl} from 'mapbox-gl';
import {longPeriodArray, shortPeriodArray} from "./data/data";

const Map = () => {
    const map = React.useRef<MapboxGL.Map>();
    const mapContainer = React.useRef<HTMLDivElement>();
    const [zoom, _setZoom] = useState(8.5);
    const setZoom = (value: typeof zoom) => {
        map.current?.setZoom(value);
        _setZoom(value);
    };

    const [center, _setCenter] = useState<[number, number]>([-111.2,34.2]);
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
        map.current.addControl(new NavigationControl());
        // map.current.on('load', () => {
        //     const canvas = document.createElement('canvas');
        //     canvas.height = 32;
        //     canvas.width = 32;
        //     const context = canvas.getContext('2d');
        //     context.strokeStyle = 'red';
        //     context.lineWidth = 2;
        //     context.arc(16,16,12,0,2*Math.PI);
        //     context.stroke();
        //     const image = context.getImageData(0,0,32,32);
        //     map.current.addImage('marker', image);
        //     map.current.addSource('points', {
        //         type: 'geojson',
        //         data: {
        //             type: 'FeatureCollection',
        //             features: [
        //                 {
        //                     type: 'Feature',
        //                     geometry: {
        //                         type: 'Point',
        //                         coordinates: [
        //                             -111.2, 34.2
        //                         ]
        //                     },
        //                     properties: {
        //                         title: 'Test Point'
        //                     }
        //                 },
        //             ]
        //         }
        //     });
        //     map.current.addLayer({
        //         id: 'points',
        //         type: 'symbol',
        //         source: 'points',
        //         layout: {
        //             "icon-image": 'marker',
        //             "text-field": ["get", "title"],
        //             'text-font': [
        //                 'Open Sans Semibold',
        //                 'Arial Unicode MS Bold'
        //             ],
        //             "text-offset": [0, 1.25],
        //             "text-anchor": "top",
        //         }
        //     })
        // });
    });

    React.useEffect(() => {
        if (!map.current) return;
        map.current.on('moveend', () => {
            const {lng,lat} = map.current.getCenter();
            _setCenter([lng,lat]);
            _setZoom(map.current.getZoom());
        });
    }, [map.current]);

    React.useEffect(() => {
        shortPeriodArray.map((point) => {
            const element = document.createElement('div');
            element.style.border = '2px solid red';
            element.style.height = '16px';
            element.style.width = '16px';
            element.style.borderRadius = '50%';
            element.style.cursor = 'pointer';
            // element.src = new URL('img/marker.svg').toString();

            const marker = new Marker({element});
            marker.setLngLat([point[1],point[0]]);
            marker.addTo(map.current);
        });
        longPeriodArray.map((point, index) => {
            const element = document.createElement('a');
            element.style.border = '2px solid blue';
            element.style.height = '16px';
            element.style.width = '16px';
            element.style.borderRadius = '50%';
            element.cloneNode()
            // element.src = new URL('img/marker.svg').toString();

            const marker = new Marker({element});
            marker.setLngLat([point[1],point[0]]);
            marker.addTo(map.current);
            marker.on('click', console.log);
        })
    }, [map.current]);

    return (
        <div>
            <div ref={mapContainer} style={{width: 400, height: 400}}/>
            {/*<div>*/}
            {/*    <pre>{center}</pre>*/}
            {/*    <pre>{zoom}</pre>*/}
            {/*</div>*/}
        </div>
    );
}

export default Map;
