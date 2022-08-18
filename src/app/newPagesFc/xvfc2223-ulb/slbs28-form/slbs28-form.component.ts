import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { Slbs28FormPreviewComponent } from "./slbs28-form-preview/slbs28-form-preview.component";
import { NavigationStart, Router } from '@angular/router';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
@Component({
  selector: "app-slbs28-form",
  templateUrl: "./slbs28-form.component.html",
  styleUrls: ["./slbs28-form.component.scss"],
})
export class Slbs28FormComponent implements OnInit {
  @ViewChild("templateSave") template;
  constructor(
    private newCommonService: NewCommonService,
    public dialog: MatDialog,
    public _router: Router
    ) {
    this.ulbData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.ulbData);
    this.ulbId = this.ulbData.ulb;
  }
  ulbData
  ulbId
  tableData;
  population
  routerNavigate = null;
  alertError =
    "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  dialogRef;
  slbData = {
    population:0
  };
  formData = {}
  ngOnInit(): void {
    this.onLoad();
  }
  callSubmitFormAPI(){
   return this.newCommonService.post28SlbsData(this.slbData).subscribe((res)=> {
      console.log(res)
      swal('Data Saved')

    }, (err)=> {
      swal(err.message)
    })
  }
  save(asDraft){
    
    this.slbData['design_year'] = '606aafb14dff55e6c075d3ae';
    this.slbData['ulb'] = this.ulbId
  let arr = []
    for(let key in this.formData){
      arr.push(...this.formData[key])
      
    }
    this.slbData['data'] = arr
    delete this.slbData['obj']
    console.log('data to be sent in POST API==>',this.slbData)
 
    
if(this.validateData()){
  if(!asDraft){
this.callSubmitFormAPI();

  }else{
    this.slbData['isDraft'] = true;
    this.callSubmitFormAPI()
  }

}else{
if(!asDraft){
  swal('Form cannot be submitted as Data is incomplete')
  return
}else{
  this.callSubmitFormAPI()
}
  console.log('Form is not complete. Save as Draft or show error if submit button is clicked')
  console.log('values error field->', this.errorFieldIDs,'required error->',this.requiredFieldIDs )
}
    console.log(this.slbData)
  }
   errorFieldIDs = []
   requiredFieldIDs = []  
   error = 0;
  validateData(){
    //checks
    //1. actual should be smaller or equal to target
    //2. all values must be there
    //3. population must be entered
    this.errorFieldIDs = []
   this.requiredFieldIDs = []  
   this.error = 0;
    let errorType = ''
  let arrOfAllData = []
  
  
    for(let key in this.formData){
      arrOfAllData.push(...(this.formData[key]))
  }
  arrOfAllData.forEach(el => {
    // if(el['_id'] == )
    if(el['actual']['value'] > el['target_1']['value']){
      this.errorFieldIDs.push(el['indicatorLineItem'])
      this.error = 1;
     
    }
    if(el['actual']['value'] == '' || el['target_1']['value'] == ''){
      this.requiredFieldIDs.push(el['indicatorLineItem'])
      this.error = 1;
    
    }
  
  })
  if(this.error){
    this.slbData['isDraft'] = true;
    return false;
  }
  this.slbData['isDraft'] = false;
    return true;
  }
  onLoad() {
    this.newCommonService.get28SlbsData(this.ulbId).subscribe((res: any) => {
      console.log("28 slbs data DATA", res);
      this.slbData = res?.data;
      Object.assign(this.formData, this.slbData['data']);
    });
  }

  returnZero() {
    return 0;
  }

  onPreview(){
    const dialogRef = this.dialog.open(Slbs28FormPreviewComponent, {
      data:  this.slbData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  openDialog(template) {
    if (template == undefined) return;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
      if (result === undefined) {
        if (this.routerNavigate) {
          // this.routerNavigate = null;
        }
      }
    });
  }
  async stay() {
    await this.dialogRef.close();
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  async proceed() {
    this.dialogRef.close();
    this.dialog.closeAll();
    if (this.routerNavigate) {
      await this.save(true);
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    await this.save(true);
    return this._router.navigate(["ulbform2223/slbs"]);
  }
  async discard() {
    sessionStorage.setItem("changeInPFMS", "false");

    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
  }
}
