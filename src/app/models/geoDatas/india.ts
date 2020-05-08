export interface IRawIndiaGEOData {
  arcs: any[];
  type: "Topology";
  objects: { india: { type: "GeometryCollection"; geometries: any[] } };
  transform: { scale: any; translate: any };
}

export interface IConvertedIndiaGEOData {
  type: "FeatureCollection";
  features: Feature[];
}

export interface Feature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: number[];
  };
  properties: {
    ST_NM: string;
  };
}
