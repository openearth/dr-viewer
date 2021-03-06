import buildGeoserverUrl from './build-geoserver-url';
import wms from './wms';

export default ({ url, id, layer, style = '', paint = {} }) => {
  const tile = buildGeoserverUrl({
    url: process.env.VUE_APP_GEOSERVER_BASE_URL,
    service: 'WMS',
    request: 'GetMap',
    layers: id,
    style,
    width: 256,
    height: 256,
    srs: 'EPSG:3857',
    transparent: true,
    bbox: '{bbox-epsg-3857}',
    format: 'image/png',
    encode: false
  });

  return wms({
    id,
    layer,
    tiles: [tile],
    tileSize: 256,
    paint
  });
};
