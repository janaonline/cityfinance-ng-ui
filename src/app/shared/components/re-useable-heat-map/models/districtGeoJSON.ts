export interface IDistrictGeoJson {
  type: "FeatureCollection";
  features: DistrictFeature[];
}
export interface DistrictFeature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: Array<Array<number[]>>;
}

export interface Properties {
  DISTRICT: string;
  ST_NM: string;
  ST_CEN_CD: number;
  DT_CEN_CD: number;
  censuscode: string;
}
