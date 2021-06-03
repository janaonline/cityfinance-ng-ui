import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from "@angular/forms";

@Component({
  selector: "app-water-rejenuvation",
  templateUrl: "./water-rejenuvation.component.html",
  styleUrls: ["./water-rejenuvation.component.scss"],
})
export class WaterRejenuvationComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeReport();
    setInterval(() => {
      console.log(this.waterRejenuvation.value.uaData);
    }, 3000);
    this.addNewUas();
  }

  waterRejenuvation: FormGroup;
  waterBodies: FormGroup;
  waterRecycle: FormGroup;
  inUaData: FormGroup;

  userData = JSON.parse(localStorage.getItem("userData"));
  Year = JSON.parse(localStorage.getItem("Years"));

  public initializeReport() {
    this.waterBodies = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      area: this.fb.control("", [Validators.required]),
      nameOfBody: this.fb.control("", [Validators.required]),
      location: this.fb.group({
        lat: this.fb.control("", [Validators.required]),
        long: this.fb.control("", [Validators.required]),
      }),
      photos: this.fb.array([
        {
          url: this.fb.control("", [Validators.required]),
          name: this.fb.control("", [Validators.required]),
        },
      ]),
      bod: this.fb.control("", [Validators.required]),
      cod: this.fb.control("", [Validators.required]),
      do: this.fb.control("", [Validators.required]),
      tds: this.fb.control("", [Validators.required]),
      turbidity: this.fb.control("", [Validators.required]),
      details: this.fb.control("", [Validators.required]),
    });

    this.waterRecycle = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      treatmentPlant: this.fb.control("", [Validators.required]),
      location: this.fb.group({
        lat: this.fb.control("", [Validators.required]),
        long: this.fb.control("", [Validators.required]),
      }),
      stp: this.fb.control("", [Validators.required]),
    });

    this.inUaData = this.fb.group({
      ua: this.fb.control("", [Validators.required]),
      waterBodies: this.fb.array([]),
      reuseWater: this.fb.array([]),
    });

    this.waterRejenuvation = this.fb.group({
      state: this.fb.control(this.userData["state"], [Validators.required]),
      design_year: this.fb.control(this.Year["2021-2022"], [
        Validators.required,
      ]),
      uaData: this.fb.array([]),
      status: this.fb.control(null, []),
      isDraft: this.fb.control(null, []),
    });
  }

  addNewRows(i) {
    const temp = this.getSubControlsWaterBodies(i);
    let newEle = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      area: this.fb.control("", [Validators.required]),
      nameOfBody: this.fb.control("", [Validators.required]),
      location: this.fb.group({
        lat: this.fb.control("", [Validators.required]),
        long: this.fb.control("", [Validators.required]),
      }),
      photos: this.fb.array([
        {
          url: this.fb.control("", [Validators.required]),
          name: this.fb.control("", [Validators.required]),
        },
      ]),
      bod: this.fb.control("", [Validators.required]),
      cod: this.fb.control("", [Validators.required]),
      do: this.fb.control("", [Validators.required]),
      tds: this.fb.control("", [Validators.required]),
      turbidity: this.fb.control("", [Validators.required]),
      details: this.fb.control("", [Validators.required]),
    });
    temp.push(newEle);

    const temp2 = this.getSubControlsWaterReuse(i);
    let newEle2 = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      treatmentPlant: this.fb.control("", [Validators.required]),
      location: this.fb.group({
        lat: this.fb.control("", [Validators.required]),
        long: this.fb.control("", [Validators.required]),
      }),
      stp: this.fb.control("", [Validators.required]),
    });
    temp2.push(newEle2);
  }

  addNewUas() {
    let i = 0;
    while (i < 3) {
      const temp = this.tabelRows;
      let ele = this.fb.group({
        ua: this.fb.control("", [Validators.required]),
        waterBodies: this.fb.array([]),
        reuseWater: this.fb.array([]),
      });
      temp.push(ele);
      let j = 3;
      while (j--) {
        this.addNewRows(i);
      }
      i++;
    }
  }

  get tabelRows() {
    return this.waterRejenuvation.get("uaData") as FormArray;
  }

  get waterBodiesArray() {
    return this.inUaData.get("waterBodies") as FormArray;
  }

  get waterReuseArray() {
    return this.inUaData.get("reuseWater") as FormArray;
  }

  get f() {
    return this.waterRejenuvation.controls;
  }

  formGroup(index) {
    return this.f.uaData["controls"][0]["controls"]["waterBodies"]["controls"][
      index
    ];
  }

  get uaData() {
    return this.f.uaData["controls"] as FormArray;
  }

  getSubControlsWaterBodies(index) {
    return this.f.uaData["controls"][index]["controls"]["waterBodies"][
      "controls"
    ] as FormArray;
  }

  getSubControlsWaterReuse(index) {
    // console.log(this.f.uaData["controls"][index]["controls"]["reuseWater"]);

    return this.f.uaData["controls"][index]["controls"]["reuseWater"][
      "controls"
    ] as FormArray;
  }

  getSubControlsWaterBodiesPhotos(index) {
    // console.log(
    //   this.f.uaData["controls"][index]["controls"]["waterBodies"]["controls"][
    //     index
    //   ]["photos"]
    // );
    return this.f.uaData["controls"][index]["controls"]["waterBodies"][
      "controls"
    ][index]["photos"] as FormArray;
  }

  getSubControlsReuseWater(index) {
    // console.log(this.f);
    return this.f.controls[index].get("reuseWater").controls;
  }

  submit() {
    console.log(this.waterRejenuvation.value);
  }
}
