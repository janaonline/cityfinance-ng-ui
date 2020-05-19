import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeatureCollection, Geometry } from 'geojson';
import { ICreditRatingData } from 'src/app/models/creditRating/creditRatingResponse';
import { ILeafletStateClickEvent } from 'src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent';
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { GeographicalService } from 'src/app/shared/services/geographical/geographical.service';
import { MapUtil } from 'src/app/util/map/mapUtil';

@Component({
  selector: "app-map-section",
  templateUrl: "./map-section.component.html",
  styleUrls: ["./map-section.component.scss"],
})
export class MapSectionComponent implements OnInit {
  statesLayer: L.GeoJSON<any>;
  myForm: FormGroup;
  stateSelected: { name: string; _id: string };

  creditRating: { [stateName: string]: number } = {};

  nationalLevelMap: L.Map;
  stateList: any[] = [{ name: "asdas", _id: 1 }];
  // stateIDSelected: string;

  mapGeoData: FeatureCollection<
    Geometry,
    {
      [name: string]: any;
    }
  >;

  DropdownSettings = {
    singleSelection: true,
    text: "All States",
    enableSearchFilter: false,
    labelKey: "name",
    primaryKey: "_id",
    showCheckbox: false,
    classes: "myclass custom-class",
  };
  constructor(
    private geoService: GeographicalService,
    private fb: FormBuilder,
    private assetService: AssetsService
  ) {
    this.initializeform();
    this.geoService.loadConvertedIndiaGeoData().subscribe((data) => {
      try {
        this.mapGeoData = data;
        this.createNationalLevelMap(data, "mapid");
      } catch (error) {}
    });
    this.fetchCreditRatingTotalCount();
  }

  ngOnInit() {}

  onSelectingStateFromDropDown(state: any | null) {
    // this.stateIDSelected = stateId;
    this.stateSelected = state;
    console.log(state, this.myForm.value);
    this.fetchDataForVisualisation(state ? state._id : null);
  }

  private fetchDataForVisualisation(stateId: string | null) {}

  private createNationalLevelMap(
    geoData: FeatureCollection<
      Geometry,
      {
        [name: string]: any;
      }
    >,
    containerId: string
  ) {
    const configuration = {
      containerId,
      geoData,
    };
    let map;

    ({ stateLayers: this.statesLayer, map } = MapUtil.createDefaultNationalMap(
      configuration
    ));

    this.nationalLevelMap = map;

    this.statesLayer.eachLayer((layer) => {
      (layer as any).bringToBack();
      (layer as any).on({
        click: (args: ILeafletStateClickEvent) => {
          // this.onClickingStateOnMap(args);
        },
      });
    });
  }

  private fetchCreditRatingTotalCount() {
    this.assetService
      .fetchCreditRatingReport()
      .subscribe((res) => this.computeStatesTotalRatings(res));
  }

  private computeStatesTotalRatings(res: ICreditRatingData[]) {
    const computedData = { total: 0 };
    res.forEach((data) => {
      if (computedData[data.state] || computedData[data.state] === 0) {
        computedData[data.state] += 1;
      } else {
        computedData[data.state] = 1;
      }
      computedData.total += 1;
    });
    console.log(computedData);

    this.creditRating = computedData;
  }

  private initializeform() {
    this.myForm = this.fb.group({
      stateId: [""],
    });
  }
}
