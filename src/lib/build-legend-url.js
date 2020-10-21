import buildGeoserverUrl from './build-geoserver-url';

export default (layer, width = 40, height = 60, scale) => buildGeoserverUrl({
  request: 'GetLegendGraphic',
  service: 'WMS',
  format: 'image/png',
  width,
  height,
  layer,
  scale
});
