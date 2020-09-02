import * as L from 'leaflet';
import { ILeafletStateClickEvent } from 'src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent';

import { IMapCreationConfig, IStateLayerStyle } from './models/mapCreationConfig';

export class MapUtil {
  private static readonly defaultStateLayerStyle: IStateLayerStyle = {
    fillColor: "#efefef",
    weight: 1,
    opacity: 1,
    color: "#403f3f",
    fillOpacity: 1
  };

  private static readonly defaultMapConfiguration = {
    scrollWheelZoom: false,
    fadeAnimation: true,
    minZoom: (Math.max(document.documentElement.clientWidth) - 1366) / 1366 + 4,
    maxZoom: (Math.max(document.documentElement.clientWidth) - 1366) / 1366 + 4,
    zoomControl: false,
    keyboard: false,
    attributionControl: false,
    doubleClickZoom: false,
    dragging: false,
    tap: false
  };

  /**
   * @description At India Map, for some states, the centroid value we get by either calculation
   * or by using leaflet <code> getBound().getCenter() </code> does not lie
   * within the state boundry.Therefore, we need to statically set centroid co ordinates for
   * those states.
   */
  private static readonly customStateCentroids = {
    Kerala: { lat: 9.999675, lng: 77.199765 },
    Punjab: { lat: 31.632808, lng: 75.976851 },
    Goa: { lat: 15.441705, lng: 74.699032 },
    Haryana: { lat: 29.501121, lng: 76.180837 },
    Delhi: { lat: 28.689453, lng: 77.814074 },
    "Himachal Pradesh": { lat: 31.747344, lng: 78.364865 }
  };

  public static getStateName(layer: ILeafletStateClickEvent | L.Layer): string {
    return layer instanceof L.Layer
      ? (<any>layer).feature.properties.ST_NM
      : layer.sourceTarget.feature.properties.ST_NM;
  }

  public static getStateCode(layer: ILeafletStateClickEvent | L.Layer): string {
    return layer instanceof L.Layer
      ? (<any>layer).feature.properties.ST_CODE
      : layer.sourceTarget.feature.properties.ST_CODE;
  }

  public static colorIndiaMap(map: L.Map, fillColor: string) {
    return map.eachLayer(layer => {
      MapUtil.colorStateLayer(layer, fillColor);
    });
  }

  public static colorStateLayer(layer: any, fillColor: string) {
    if (!layer.setStyle) {
      return;
    }
    layer.setStyle(
      {
        fillOpacity: 1,
        fillColor,
        weight: -1
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

    const stateLayers = MapUtil.applyStyleOnStates(
      configuration.geoData,
      configuration.layerOptions
    ).addTo(map);

    map = MapUtil.centerMap(map, stateLayers);

    return { map, stateLayers };
  }

  public static getStateCentroid(
    layer: ILeafletStateClickEvent | L.Layer
  ): { lat: number; lng: number } {
    const stateName = MapUtil.getStateName(layer);
    if (!stateName) {
      return null;
    }
    return MapUtil.customStateCentroids[stateName]
      ? MapUtil.customStateCentroids[stateName]
      : (<any>layer).getBounds().getCenter();
  }

  private static applyStyleOnStates(
    geoData: IMapCreationConfig["geoData"],
    style?: IStateLayerStyle
  ) {
    if (style) {
      return L.geoJSON(geoData, {
        style: { ...MapUtil.defaultStateLayerStyle, ...style }
      });
    }
    return L.geoJSON(geoData, {
      style: MapUtil.defaultStateLayerStyle
    });
  }

  private static centerMap(map: L.Map, stateLayers: L.GeoJSON<any>) {
    return map.fitBounds(stateLayers.getBounds(), {
      paddingBottomRight: [0, 0],
      padding: [0, 0],
      maxZoom: 8
    });
  }
}
