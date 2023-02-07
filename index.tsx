import React from 'react';
import ReactDOM from 'react-dom';
const app = document.createElement('app');
document.body.append(app);
ReactDOM.render(<Map/>, app);

import MapboxGL from 'mapbox-gl';
import Map from "./Map";
MapboxGL.accessToken = '';
// const map = new MapboxGL.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
// });
