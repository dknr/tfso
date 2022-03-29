import React, {useState} from 'react';
import MapboxGL, {Marker, NavigationControl} from 'mapbox-gl';
import {data, LatLon, Waypoint} from "./data/data";

const congruent = (a: [number, number], b: [number, number]) =>
  (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])) < 1e-5;

// const initialZoom = 10;
// const initialCenter: LatLon = [-111.2,34.2];
const initial: {zoom: number; center: LatLon} = {
    zoom: 10,
    center: [-111.2,34.2],
}

const Map = () => {
    const map = React.useRef<MapboxGL.Map>();
    const mapContainer = React.useRef<HTMLDivElement>();
    const [activePoint, setActivePoint] = useState<{ waypoint: Waypoint, element: HTMLElement }>(null);

    const [zoom, _setZoom] = useState(initial.zoom);
    const [center, _setCenter] = useState<LatLon>(initial.center);
    // const setCenter = (value: typeof center) => {
    //     map.current?.setCenter(value);
    //     _setCenter(value);
    // };

    React.useEffect(() => {
        if (map.current) return;
        map.current = new MapboxGL.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            zoom, center,
        });
        map.current.addControl(new NavigationControl());
    });

    React.useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            const {lng,lat} = map.current.getCenter();
            _setCenter([lng,lat]);
            _setZoom(map.current.getZoom());
        });
    }, [map.current]);

    React.useEffect(() => {
        data.map((waypoint) => {
            const element = document.createElement('div');
            element.style.border = `2px solid ${waypoint.color}`;
            element.style.height = '16px';
            element.style.width = '16px';
            element.style.borderRadius = '50%';
            element.style.cursor = 'pointer';
            element.addEventListener('click', (e) => {
                console.log(e);
                setActivePoint({waypoint, element});
                map.current.flyTo({
                    zoom: 14,
                    center: [waypoint.location[1], waypoint.location[0]],
                })
                // map.current.zoomTo(11);
            });

            const tag = document.createElement('pre');
            tag.innerText = waypoint.name;
            tag.className = 'tag';
            element.append(tag);

            const marker = new Marker({element});
            marker.setLngLat([waypoint.location[1],waypoint.location[0]]);
            marker.addTo(map.current);
        });
    }, [map.current]);

    React.useEffect(() => {
        [
          ...Array.from(document.getElementsByClassName('tag')),
          ...Array.from(document.getElementsByClassName('tag-hidden')),
        ].forEach((element) => {
            if (map.current?.getZoom() >= 10) {
                element.className = 'tag';
            } else {
                console.log('hiding');
                element.className = 'tag-hidden';
            }
        })
    }, [map.current?.getZoom()]);

    return (
        <div className={'container'}>
            <div id={'map'} ref={mapContainer}/>
            <div id={'info'}>
                <button onClick={() => map.current?.flyTo(initial)}>
                    Reset
                </button>
                <pre>{activePoint
                  ? `${activePoint.waypoint.name}\n${activePoint.waypoint.location}`
                  : 'TFSO Map\nClick/Tap a point for more info'
                }</pre>
            </div>
        </div>
    );
}

export default Map;
