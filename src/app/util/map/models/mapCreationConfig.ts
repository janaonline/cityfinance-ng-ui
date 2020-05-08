import { FeatureCollection, Geometry } from 'geojson';
import { MapOptions } from 'leaflet';

export interface IMapCreationConfig {
  geoData: FeatureCollection<
    Geometry,
    {
      [name: string]: any;
    }
  >;
  containerId: string;
  options?: MapOptions;
}
