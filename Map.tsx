import React, {useState} from 'react';
import MapboxGL, {Marker, NavigationControl} from 'mapbox-gl';
import {data, LatLon, longPeriodArray, Waypoint} from "./data/data";

const congruent = (a: [number, number], b: [number, number]) =>
  (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])) < 1e-5;

// const initialZoom = 10;
// const initialCenter: LatLon = [-111.2,34.2];
const initial: {zoom: number; center: LatLon} = {
  zoom: 10,
  center: [-111.2,34.2],
}
/*
* <pre>{activePoint
                  ? `${activePoint.waypoint.tag}\n${activePoint.waypoint.location}`
                  : 'TFSO Map\nClick/Tap a point for more info'
                }</pre>
                * */
const Introduction = () => <pre>{`TFSO Map\nClick/Tap a point for more info`}</pre>;
const PointSummary = ({point}) =>  <pre>{point
  ? `${point.waypoint.tag}\n${point.waypoint.location}`
  : '???'
}</pre>

const handleLoad = (map: MapboxGL.Map) => async () => {
  const image = await new Promise<HTMLImageElement | ImageBitmap>((resolve, reject) => map.loadImage(
    new URL('images/marker.png', import.meta.url).toString(),
    (error, image) => {
      if (error) {
        reject(error);
      }
      resolve(image);
    }
  ));
  map.addImage('tfso-marker', image);
  map.addSource('tfso', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [longPeriodArray[0][1], longPeriodArray[0][0]],
          },
          properties: {
            title: 'LP-1',
          }
        }
      ]
    }
  });
  map.addLayer({
    id: 'tfso',
    type: 'symbol',
    source: 'tfso',
    layout: {
      'icon-image': 'tfso-marker',
      'text-field': ['get', 'title'],
      // 'text-font': [
      //   'Open Sans Semibold',
      //   'Arial Unicode MS Bold'
      // ],
      // 'text-offset': [0, 1.25],
      'text-anchor': 'top',
      "icon-anchor": 'bottom',
    },
  });
}

type ActivePoint = { waypoint: Waypoint, element: HTMLElement };
const Map = () => {
  const map = React.useRef<MapboxGL.Map>();
  const mapContainer = React.useRef<HTMLDivElement>();
  const [activePoint, _setActivePoint] = useState<ActivePoint>(null);
  const setActivePoint = (point: ActivePoint) => {
    _setActivePoint(point);
    map.current.flyTo({
      zoom: 14,
      center: [point.waypoint.location[1], point.waypoint.location[0]],
    });
  }

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
    // map.current.on('load', handleLoad(map.current));
  }, [map.current]);

  React.useEffect(() => {
      data.map((waypoint) => {
          const circle = document.createElement('div');
          circle.style.border = `2px solid ${waypoint.color}`;
          circle.style.height = '16px';
          circle.style.width = '16px';
          circle.style.borderRadius = '50%';
          circle.style.cursor = 'pointer';
          circle.addEventListener('click', (e) => {
              setActivePoint({waypoint, element: circle});
              // circle.style.border = `2px solid orange`;
          });

          const tag = document.createElement('pre');
          tag.innerText = waypoint.tag;
          tag.className = 'tag';
          circle.append(tag);

          const marker = new Marker({element: circle});
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
      <div id={'info'} style={{width: 240}}>
        <button onClick={() => map.current?.flyTo(initial)}>
          Reset
        </button>
        {activePoint ? <PointSummary point={activePoint}/> : <Introduction/>}
        {/*<pre>{activePoint*/}
        {/*  ? `${activePoint.waypoint.tag}\n${activePoint.waypoint.location}`*/}
        {/*  : 'TFSO Map\nClick/Tap a point for more info'*/}
        {/*}</pre>*/}
      </div>
    </div>
  );
}

export default Map;
