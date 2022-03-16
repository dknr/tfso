import React from 'react';
import ReactDOM from 'react-dom';
const app = document.createElement('app');
document.body.append(app);
ReactDOM.render(<Map/>, app);

import MapboxGL from 'mapbox-gl';
import Map from "./Map";
MapboxGL.accessToken = 'pk.eyJ1Ijoic2Vpc20iLCJhIjoiY2t6dXh0N2l6MGNpeDJ1czI4aGo1N2s4NSJ9.Krvm-XGitbSTARZOnkivCA';
const map = new MapboxGL.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
});
