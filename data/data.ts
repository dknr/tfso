import {fromNad27} from './proj'

export type LatLon = [number,number];

const dms = (d: number, m: number, s: number): number =>
    (Math.abs(d) + Math.abs(m / 60) + Math.abs(s / 3600)) * Math.sign(d);
export const longPeriodArray: LatLon[] = [
  [dms(34,16, 3.760), dms(-111,16,12.972)],
  [dms(34,23,36.480), dms(-111,15,13.000)],
  [dms(34,19,23.249), dms(-111, 1, 1.673)],
  [dms(34, 7,23.800), dms(-110,57,44.100)],  // NOTE: possible typo in source - assuming 110 instead of 111
  [dms(33,58,53.495), dms(-111, 9,59.875)],
  [dms(34, 3,11.521), dms(-111,24, 8.340)],
  [dms(34,15,28.296), dms(-111,26,47.180)],
].map(fromNad27);

export const shortPeriodArray: LatLon[] = [
  [dms(34,16,42.330), dms(-111,18,12.256)], // Z-1
  [dms(34,19,14.119), dms(-111,19,26.672)],
  [dms(34,18,42.576), dms(-111,16,56.073)],
  [dms(34,16,13.891), dms(-111,14,56.738)],
  [dms(34,14,10.222), dms(-111,17, 2.267)],
  [dms(34,14,55.697), dms(-111,20, 7.003)],
  [dms(34,17, 9.183), dms(-111,21,24.549)],
  [dms(34,21,42.290), dms(-111,20,23.536)],
  [dms(34,21,10.002), dms(-111,17,12.964)],
  [dms(34,20,52.209), dms(-111,14, 4.913)], // Z-10
  [dms(34,18, 4.865), dms(-111,12,23.863)],
  [dms(34,15,49.507), dms(-111,11,44.738)],
  [dms(34,13,48.402), dms(-111,13,48.316)],
  [dms(34,11,41.443), dms(-111,16,30.294)],
  [dms(34,12, 8.076), dms(-111,19, 8.444)],
  [dms(34,12,32.081), dms(-111,22,13.955)],
  [dms(34,15, 3.954), dms(-111,23,28.274)],
  [dms(34,17,40.876), dms(-111,24,39.955)],
  [dms(34,19,39.854), dms(-111,22,32.401)],
  [dms(34,24, 9.131), dms(-111,21,53.295)], // Z-20
  [dms(34,23,37.574), dms(-111,17,26.357)],
  [dms(34,23,28.832), dms(-111,15,15.705)],
  [dms(34,22,49.935), dms(-111,12, 3.350)],
  [dms(34,20,19.749), dms(-111,10,50.215)],
  [dms(34,18, 0.133), dms(-111, 9,27.709)],
  [dms(34,15,26.079), dms(-111, 8,32.814)],
  [dms(34,13,17.260), dms(-111,10,34.309)],
  [dms(34,11, 6.032), dms(-111,12,54.110)],
  [dms(34, 9,15.999), dms(-111,14,36.365)],
  [dms(34, 9,38.040), dms(-111,17,47.762)], // Z-30
  [dms(34, 9,53.404), dms(-111,21, 4.736)],
  [dms(34,10,27.080), dms(-111,24,18.699)],
  [dms(34,12,57.216), dms(-111,25,29.749)],
  [dms(34,14,27.436), dms(-111,26,45.833)],
  [dms(34,18, 1.630), dms(-111,27,59.311)],
  [dms(34,20, 2.520), dms(-111,25,49.293)],
  [dms(34,22, 4.959), dms(-111,23,34.094)], // Z-37
].map(fromNad27);

// source: TFSO TR 67-34 p.16
export const portableArray: LatLon[] = [
  [dms(34, 7,36    ), dms(-111,16,52    )], // PY-1
  [dms(34,12,40    ), dms(-111,18,45    )],
  [dms(34,15,15    ), dms(-111,19,37    )],
  [dms(34,17,34    ), dms(-111,10, 0    )],
  [dms(34,18,58    ), dms(-111, 3,47    )],
].map(fromNad27);

export type Waypoint = {
  location: LatLon;
  name: string;
  color: string;
}
const expand = (data: LatLon[], prefix: string, options: {color: string}): Waypoint[] => data.map((location, index) => {
  return {
    location,
    name: `${prefix}-${index+1}`,
    color: options.color,
  }
});

export const data: Waypoint[] = [
  ...expand(shortPeriodArray, 'Z', {color: 'blue'}),
  ...expand(longPeriodArray, 'LP', {color: 'red'}),
  ...expand(portableArray, 'PY', {color: 'green'}),
  {location: [34.382482,-111.287791], name: 'Cave', color: 'orange'},
  {location: [34.385956,-111.303401], name: 'Karst', color: 'orange'},
  {location: [34.387546,-111.303609], name: 'Cave', color: 'orange'},
  {location: [34.386760,-111.300701], name: 'Cave', color: 'orange'},

];
