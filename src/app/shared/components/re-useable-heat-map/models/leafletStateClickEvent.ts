export interface ILeafletStateClickEvent {
  originalEvent: any;
  containerPoint: any;
  layerPpoint: any;
  type: "click";
  target: any;
  latlng: { lat: number; lng: number };
  sourceTarget: {
    feature: {
      type: "Feature";
      geometry: {};
      properties: { id: string; ST_NM: string };
    };
  };
}
