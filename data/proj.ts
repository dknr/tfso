/*
import proj4 from 'proj4';
//proj4.defs('NAD27', '+proj=longlat +datum=NAD27 +no_defs');
proj4.defs('EPSG:4267', 'GEOGCS["NAD27",DATUM["North_American_Datum_1927",SPHEROID["Clarke 1866",6378206.4,294.9786982139006,AUTHORITY["EPSG","7008"]],AUTHORITY["EPSG","6267"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4267"]]');
proj4.defs('EPSG:4760', 'GEOGCS["WGS 66",DATUM["World_Geodetic_System_1966",SPHEROID["NWL 9D",6378145,298.25,AUTHORITY["EPSG","7025"]],AUTHORITY["EPSG","6760"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4760"]]');
const fromNad27 = ([nadLat,nadLon]) => {
  const [wgsLon, wgsLat] = proj4('EPSG:4760', 'WGS84', [nadLon, nadLat]);
  return [wgsLat, wgsLon];
}
*/

// apply constant offset from NAD27 -> NAD83 (approximation)
// this is prob only valid around Payson, but it's close enough for govt work
//  from https://www.ngs.noaa.gov/cgi-bin/nadcon.prl
export const fromNad27 = ([lat,lon]: [number,number]): [number,number] => [
  Number((lat + (0.11957/3600)).toFixed(6)),
  Number((lon - (2.49333/3600)).toFixed(6)),
];
