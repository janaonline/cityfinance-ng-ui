import * as L from 'leaflet';
import { ILeafletStateClickEvent } from 'src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent';

import { IMapCreationConfig } from './models/mapCreationConfig';

export class MapUtil {
  private static readonly defaultStateLayerStyle = {
    fillColor: "#E5E5E5",
    weight: 1,
    opacity: 1,
    color: "white",
    fillOpacity: 1,
  };

  private static readonly defaultMapConfiguration = {
    scrollWheelZoom: false,
    fadeAnimation: true,
    dragging: false,
    minZoom: (Math.max(document.documentElement.clientWidth) - 1366) / 1366 + 4,
    maxZoom: (Math.max(document.documentElement.clientWidth) - 1366) / 1366 + 4,
    zoomControl: false,
    doubleClickZoom: false,
    keyboard: false,
  };

  public static getStateName(layer: ILeafletStateClickEvent | L.Layer): string {
    return layer instanceof L.Layer
      ? (<any>layer).feature.properties.ST_NM
      : layer.sourceTarget.feature.properties.ST_NM;
  }

  public static colorStateLayer(layer: any, fillColor: string) {
    layer.setStyle(
      {
        fillOpacity: 1,
        fillColor,
        weight: -1,
      },
      true
    );
  }

  /**
   *
   * @description A default national map will have gray color on each state with their boundries
   * colored white. It will be centered. Zoom Level will be calculated automatically.
   * To override the zoom levels, keyboard interaction, drag behaviour etc, pass the option
   * paramter in the configuration.
   */
  public static createDefaultNationalMap(configuration: IMapCreationConfig) {
    const options = configuration.options
      ? { ...MapUtil.defaultMapConfiguration, ...configuration.options }
      : MapUtil.defaultMapConfiguration;
    let map = L.map(configuration.containerId, options).setView(
      [20.59, 78.96],
      0.1
    );

    const stateLayers = MapUtil.applyDefaultStateColor(
      configuration.geoData
    ).addTo(map);

    map = MapUtil.centerMap(map, stateLayers);

    return { map, stateLayers };
  }

  private static applyDefaultStateColor(
    geoData: IMapCreationConfig["geoData"]
  ) {
    return L.geoJSON(geoData, {
      style: MapUtil.defaultStateLayerStyle,
    });
  }

  private static centerMap(map: L.Map, stateLayers: L.GeoJSON<any>) {
    return map.fitBounds(stateLayers.getBounds(), {
      paddingBottomRight: [0, 0],
      padding: [0, 0],
      maxZoom: 8,
    });
  }
}
