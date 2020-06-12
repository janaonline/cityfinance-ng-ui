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

  layerOptions?: IStateLayerStyle;
}

export interface IStateLayerStyle {
  fillColor?: string; // Color for each State
  weight?: number;
  opacity?: number; // Boundary Opacity of each state
  color?: string; // Boundary Color for each state
  fillOpacity?: number; // Opacity for each state.
}
