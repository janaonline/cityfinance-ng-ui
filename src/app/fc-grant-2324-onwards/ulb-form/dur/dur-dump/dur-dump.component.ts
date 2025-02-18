import { Component, OnInit } from '@angular/core';
import { ulbs_data } from "src/app/fc-grant-2324-onwards/ulb-form/dur/dur-dump/ulbsData";

@Component({
  selector: 'app-dur-dump',
  templateUrl: './dur-dump.component.html',
  styleUrls: ['./dur-dump.component.scss']
})
export class DurDumpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //<-----------------------------------bulk pdf download----------------------------->
    // for 2022-23
    // ulbs_data.slice(0, 20).forEach(ulb => {
    //   window.open(`/ulbform2223/utilisation-report/${ulb.ulbId}?ulbName=${ulb.ulbName}&ulbCode=${ulb.ulbCode}&stateName=${ulb.stateName}&status=${ulb?.formStatus}`, '_blank')
    // });

    // for 2023-24
    ulbs_data.slice(0, 2).forEach(ulb => {
      // console.log("-------------------data--------------->", ulb.ulbId, ulb.ulbName, ulb.ulbCode, ulb.stateName, ulb.formStatus)
      window.open(`/ulb-form/606aafc14dff55e6c075d3ec/utilisation-report/${ulb.ulbId}?ulbName=${ulb.ulbName}&ulbCode=${ulb.ulbCode}&stateName=${ulb.stateName}&status=${ulb.formStatus}&downloadPdf=true`, '_blank')
    });
  }

}
