import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from "@angular/forms";
import { WaterRejenuvationService } from "./water-rejenuvation.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SweetAlert } from "sweetalert/typings/core";
import { ImagePreviewComponent } from "../../../pages/ulbform/utilisation-report/image-preview/image-preview.component";
import { MapDialogComponent } from "../../../shared/components/map-dialog/map-dialog.component";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { HttpEventType, JsonpClientBackend } from "@angular/common/http";
import { Router, NavigationStart, Event } from "@angular/router";

const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-water-rejenuvations",
  templateUrl: "./water-rejenuvation.component.html",
  styleUrls: ["./water-rejenuvation.component.scss"],
})
export class WaterRejenuvationComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private waterRejenuvationService: WaterRejenuvationService,
    private dialog: MatDialog,
    private dataEntryService: DataEntryService,
    private _router: Router
  ) {
    this._router.events.subscribe(async (event: Event) => {
      if (!this.saveClicked) {
        if (event instanceof NavigationStart) {
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInWaterRejenuvation", "false");
            return;
          }
          const change = sessionStorage.getItem("changeInWaterRejenuvation");
          if (change === "true" && this.routerNavigate === null) {
            this.routerNavigate = event;
            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, {
              skipLocationChange: true,
            });
            this.openModal(this.template);
          }
        }
      }
    });
  }

  async ngOnInit() {
    sessionStorage.setItem("changeInWaterRejenuvation", "false");
    await this.loadData();
    this.initializeReport();
  }
  @ViewChild("template") template;

  routerNavigate = null;
  saveClicked = false;
  showLoader = true;
  data;
  waterRejenuvation: FormGroup;
  waterBodies: FormGroup;
  waterRecycle: FormGroup;
  inUaData: FormGroup;
  maxPhotos = 5;
  photosArray = [];
  errorPhotosArray = [];
  dialogRefForNavigation;

  userData = JSON.parse(localStorage.getItem("userData"));
  Year = JSON.parse(localStorage.getItem("Years"));

  public initializeReport() {
    // this.waterBodies = this.fb.group({
    //   name: this.fb.control("", [Validators.required]),
    //   area: this.fb.control("", [Validators.required]),
    //   nameOfBody: this.fb.control("", [Validators.required]),
    //   location: this.fb.group({
    //     lat: this.fb.control("", [Validators.required]),
    //     long: this.fb.control("", [Validators.required]),
    //   }),
    //   photos: this.fb.array([
    //     {
    //       url: this.fb.control("", [Validators.required]),
    //       name: this.fb.control("", [Validators.required]),
    //     },
    //   ]),
    //   bod: this.fb.control("", [Validators.required]),
    //   cod: this.fb.control("", [Validators.required]),
    //   do: this.fb.control("", [Validators.required]),
    //   tds: this.fb.control("", [Validators.required]),
    //   turbidity: this.fb.control("", [Validators.required]),
    //   details: this.fb.control("", [Validators.required]),
    // });

    // this.waterRecycle = this.fb.group({
    //   name: this.fb.control("", [Validators.required]),
    //   treatmentPlant: this.fb.control("", [Validators.required]),
    //   location: this.fb.group({
    //     lat: this.fb.control("", [Validators.required]),
    //     long: this.fb.control("", [Validators.required]),
    //   }),
    //   stp: this.fb.control("", [Validators.required]),
    // });

    // this.inUaData = this.fb.group({
    //   ua: this.fb.control("", [Validators.required]),
    //   waterBodies: this.fb.array([]),
    //   reuseWater: this.fb.array([]),
    // });
    this.waterRejenuvation = this.fb.group({
      state: this.fb.control(this.userData["state"], [Validators.required]),
      design_year: this.fb.control(this.Year["2021-22"], [Validators.required]),
      uaData: this.fb.array(this.getUas()),
      status: this.fb.control(null, []),
      isDraft: this.fb.control(true, []),
    });
    this.waterRejenuvation.valueChanges.subscribe((change) => {
      console.log("change in waterRejenuvation", change);
      let data = sessionStorage.getItem("waterRejenuvationData");
      if (JSON.stringify(change) != data) {
        sessionStorage.setItem("changeInWaterRejenuvation", "true");
      } else {
        sessionStorage.setItem("changeInWaterRejenuvation", "false");
      }
    });
  }

  get Uas() {
    if (!this.showLoader)
      return this.waterRejenuvation.get("uaData")["controls"] as FormArray;
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

  get f() {
    return this.waterRejenuvation.controls;
  }

  getUas() {
    return this.data.map((data) =>
      this.fb.group({
        ua: data.ua,
        waterBodies: this.fb.array(this.getWaterBodies(data.waterBodies)),
        reuseWater: this.fb.array(this.getReuseWater(data.reuseWater)),
        foldCard: false,
      })
    );
  }

  getWaterBodies(dataArray) {
    return dataArray.map((data) =>
      this.fb.group({
        name: this.fb.control(data.name, [Validators.required]),
        area: this.fb.control(data.area, [Validators.required]),
        nameOfBody: this.fb.control(data.nameOfBody, [Validators.required]),
        lat: this.fb.control(data.lat, [Validators.required]),
        long: this.fb.control(data.long, [Validators.required]),
        photos: this.fb.array(this.getPhotos(data.photos)),
        bod: this.fb.control(data.bod, [Validators.required]),
        cod: this.fb.control(data.cod, [Validators.required]),
        do: this.fb.control(data.do, [Validators.required]),
        tds: this.fb.control(data.tds, [Validators.required]),
        turbidity: this.fb.control(data.tds, [Validators.required]),
        details: this.fb.control(data.details, [Validators.required]),
      })
    );
  }

  getPhotos(dataArray) {
    return dataArray.map((data) =>
      this.fb.group({
        url: this.fb.control(data.url),
        name: this.fb.control(data.name),
      })
    );
  }

  getReuseWater(dataArray) {
    return dataArray.map((data) =>
      this.fb.group({
        name: this.fb.control(data.name, [Validators.required]),
        treatmentPlant: this.fb.control(data.treatmentPlant, [
          Validators.required,
        ]),
        lat: this.fb.control(data.lat, [Validators.required]),
        long: this.fb.control(data.long, [Validators.required]),
        stp: this.fb.control(data.stp, [Validators.required]),
      })
    );
  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.waterRejenuvationService.getData(this.Year["2021-22"]).subscribe(
        (res) => {
          this.data = res["data"]["uaData"];
          sessionStorage.setItem(
            "waterRejenuvationData",
            JSON.stringify(res["data"])
          );
          console.log(this.data);
          this.showLoader = false;
          resolve("ss");
        },
        (err) => {
          console.log(err);
          this.data = [
            {
              ua: "609bbdc86d5b0a40b895b72a",
              waterBodies: [
                {
                  name: "test",
                  area: 78,
                  nameOfBody: "test",
                  lat: "test",
                  long: "test",
                  photos: [
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                  ],
                  bod: "test",
                  cod: "test",
                  do: "test",
                  tds: "test",
                  turbidity: "test",
                  details: "test",
                },
                {
                  name: "test",
                  area: 78,
                  nameOfBody: "test",
                  lat: "test",
                  long: "test",
                  photos: [
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                  ],
                  bod: "test",
                  cod: "test",
                  do: "test",
                  tds: "test",
                  turbidity: "test",
                  details: "test",
                },
                {
                  name: "test",
                  area: 78,
                  nameOfBody: "test",
                  lat: "test",
                  long: "test",
                  photos: [
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                  ],
                  bod: "test",
                  cod: "test",
                  do: "test",
                  tds: "test",
                  turbidity: "test",
                  details: "test",
                },
              ],
              reuseWater: [
                {
                  name: "test",
                  treatmentPlant: "test",
                  lat: "test",
                  long: "test",
                  stp: "test",
                },
                {
                  name: "test",
                  treatmentPlant: "test",
                  lat: "test",
                  long: "test",
                  stp: "test",
                },
                {
                  name: "test",
                  treatmentPlant: "test",
                  lat: "test",
                  long: "test",
                  stp: "test",
                },
              ],
            },
            {
              ua: "609bbdc86d5b0a40b895b72a",
              waterBodies: [
                {
                  name: "test",
                  area: 78,
                  nameOfBody: "test",
                  lat: "test",
                  long: "test",
                  photos: [
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                  ],
                  bod: "test",
                  cod: "test",
                  do: "test",
                  tds: "test",
                  turbidity: "test",
                  details: "test",
                },
                {
                  name: "test",
                  area: 78,
                  nameOfBody: "test",
                  lat: "test",
                  long: "test",
                  photos: [
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                  ],
                  bod: "test",
                  cod: "test",
                  do: "test",
                  tds: "test",
                  turbidity: "test",
                  details: "test",
                },
                {
                  name: "test",
                  area: 78,
                  nameOfBody: "test",
                  lat: "test",
                  long: "test",
                  photos: [
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                  ],
                  bod: "test",
                  cod: "test",
                  do: "test",
                  tds: "test",
                  turbidity: "test",
                  details: "test",
                },
              ],
              reuseWater: [
                {
                  name: "test",
                  treatmentPlant: "test",
                  lat: "test",
                  long: "test",
                  stp: "test",
                },
                {
                  name: "test",
                  treatmentPlant: "test",
                  lat: "test",
                  long: "test",
                  stp: "test",
                },
                {
                  name: "test",
                  treatmentPlant: "test",
                  lat: "test",
                  long: "test",
                  stp: "test",
                },
              ],
            },
            {
              ua: "609bbdc86d5b0a40b895b72a",
              waterBodies: [
                {
                  name: "test",
                  area: 78,
                  nameOfBody: "test",
                  lat: "test",
                  long: "test",
                  photos: [
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                  ],
                  bod: "test",
                  cod: "test",
                  do: "test",
                  tds: "test",
                  turbidity: "test",
                  details: "test",
                },
                {
                  name: "test",
                  area: 78,
                  nameOfBody: "test",
                  lat: "test",
                  long: "test",
                  photos: [
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                  ],
                  bod: "test",
                  cod: "test",
                  do: "test",
                  tds: "test",
                  turbidity: "test",
                  details: "test",
                },
                {
                  name: "test",
                  area: 78,
                  nameOfBody: "test",
                  lat: "test",
                  long: "test",
                  photos: [
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                    {
                      url: "test",
                      name: "test",
                    },
                  ],
                  bod: "test",
                  cod: "test",
                  do: "test",
                  tds: "test",
                  turbidity: "test",
                  details: "test",
                },
              ],
              reuseWater: [
                {
                  name: "test",
                  treatmentPlant: "test",
                  lat: "test",
                  long: "test",
                  stp: "test",
                },
                {
                  name: "test",
                  treatmentPlant: "test",
                  lat: "test",
                  long: "test",
                  stp: "test",
                },
                {
                  name: "test",
                  treatmentPlant: "test",
                  lat: "test",
                  long: "test",
                  stp: "test",
                },
              ],
            },
          ];
          resolve("ss");
        }
      );
    });
  }

  submit() {
    console.log(this.waterRejenuvation.value);

    this.waterRejenuvationService
      .postData(this.waterRejenuvation.value)
      .subscribe(
        (res) => {
          console.log(res);
          swal({
            title: "Submitted",
            text: "Record submitted successfully!",
            icon: "success",
          });
          if (this.routerNavigate) {
            this._router.navigate([this.routerNavigate.url]);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  foldCard(index) {
    console.log(this.Uas[index].controls.foldCard.value, index);
    this.Uas[index].controls.foldCard.value =
      !this.Uas[index].controls.foldCard.value;
  }

  checkCard(index) {
    return this.Uas[index].controls.foldCard.value;
  }

  imgPreview(waterIndex, uaIndex) {
    let waterBodies = this.getSubControlsWaterBodies(uaIndex);
    let imgData = waterBodies[waterIndex].controls.photos.value;
    if (imgData.length == 0) {
      return swal("No photos added", "", "warning");
    }
    let dialogRef = this.dialog.open(ImagePreviewComponent, {
      data: imgData,
      height: "400px",
      width: "500px",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  removePhotos(waterIndex, uaIndex) {
    let mess = window.confirm("Do you want delete all photos");
    let control = this.getSubControlsWaterBodies(uaIndex);
    let photoControl = control[waterIndex].controls.photos;
    if (mess) {
      photoControl.clear();
      swal(`All photos deleted`, "successfully", "success");
    }
  }

  openMap(nameIndex, uaIndex, name): void {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      width: "auto",
      height: "auto",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result, "iiiiiiiiiiiiiiiiii", uaIndex);
      let temp;
      if (name == "waterBodies") {
        temp = this.getSubControlsWaterBodies(uaIndex);
      } else {
        temp = this.getSubControlsWaterReuse(uaIndex);
      }
      temp[nameIndex].controls.lat.patchValue(result.lat);
      temp[nameIndex].controls.long.patchValue(result.long);
    });
  }

  async onFileChange(event, waterIndex, uaIndex) {
    console.log(event.target.files);
    this.photosArray = [];
    const files = event.target.files;
    let msg = "Photo uploaded successfully.";
    let title = "Success";
    let status = "success";
    let control = this.getSubControlsWaterBodies(uaIndex);
    let photoControl = control[waterIndex].controls.photos;
    let leftNum = this.checkPhotos(files.length, photoControl);

    if (typeof leftNum === "boolean") {
      swal(
        `Max ${this.maxPhotos} photos are allowed`,
        "Delete saved Photos to Continue.",
        "error"
      );
      return;
    }

    let size = files.length - leftNum;
    for (const key in files) {
      if (key == "length") break;
      if (size == 0) {
        msg = `First ${files.length - leftNum} uploaded successfully`;
        title = `Max ${this.maxPhotos} photos are allowed`;
        status = "warning";
        break;
      }
      await this.uploadFile(files[key], files[key].name, files[key].type);
      size--;
    }

    let photo = this.getPhotos(this.photosArray);
    photo.forEach((element) => {
      photoControl.push(element);
    });
    swal(title, msg, status);
  }

  checkPhotos(size, photoControl) {
    let photoControlSize = photoControl.value.length ?? 0;
    if (photoControlSize == this.maxPhotos) return false;
    if (this.maxPhotos - photoControlSize - size < 0) {
      size = size - (this.maxPhotos - photoControlSize);
    }
    return size;
  }

  uploadFile(file, name, type) {
    return new Promise<void>((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(name, type).subscribe(
        (s3Response) => {
          resolve();
          console.log(s3Response.data[0]);
          const res = s3Response.data[0];
          this.uploadFileToS3(file, res["url"], res["file_alias"]);
          this.photosArray.push({ url: res["file_alias"], name });
        },
        (err) => {
          console.log(err);
          this.errorPhotosArray.push(file);
        }
      );
    });
  }

  private uploadFileToS3(file: File, s3URL: string, fileAlias: string) {
    this.dataEntryService.uploadFileToS3(file, s3URL).subscribe(
      (res) => {
        if (res.type === HttpEventType.Response) {
          console.log(res);
        }
      },
      (err) => {
        this.errorPhotosArray.push(file);
        console.log(err);
      }
    );
  }

  uaIdToName(index) {
    let uasData = JSON.parse(sessionStorage.getItem("uasData"));
    if (uasData) {
      let uaDataAtIndex = uasData[this.Uas[index]["ua"]];
      return uaDataAtIndex.name;
    } else {
      return "Sanju";
    }
  }

  openModal(template: TemplateRef<any>) {
    // this.dialogRefForNavigation = this.modalService.show(template, { class: "modal-md" });
    const dialogConfig = new MatDialogConfig();
    this.dialogRefForNavigation = this.dialog.open(template, dialogConfig);
    this.dialogRefForNavigation.afterClosed().subscribe((result) => {
      if (result === undefined) {
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }

  stay() {
    this.dialogRefForNavigation.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }

  proceed() {
    this.dialogRefForNavigation.close(true);
    this.submit();
  }

  alertClose() {
    this.dialogRefForNavigation.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
}
