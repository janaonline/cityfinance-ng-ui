import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AboutService } from "./about.service";

@Component({
  selector: "app-about-indicator",
  templateUrl: "./about-indicator.component.html",
  styleUrls: ["./about-indicator.component.scss"],
})
export class AboutIndicatorComponent implements OnInit, OnChanges {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private aboutService: AboutService
  ) {}
  panelOpenState = false;
  @Input()
  positive;
  @Input()
  cagr = "";
  @Input()
  data = [
    {
      desc: [
        {
          links: [
            {
              label: "Property tax reforms toolkit",
              url: "",
            },
          ],
          text: "Refer to MoHUA (Govt of India) Property tax reforms toolkit ",
        },
        {
          links: [
            {
              label: "video tutorial",
              url: "",
            },
          ],
          text: "See video tutorial on implementing property tax reforms",
        },
        {
          links: [
            {
              label: "video interviews",
              url: "",
            },
          ],
          text: " See video interviews of Municipal Commissioners on how to improve own revenues",
        },
        {
          links: [
            {
              label: "List & Contact details",
              url: "",
            },
          ],
          text: "Want to Phone-a-Commissioner? See List & Contact details of Municipal Commissioners who have improved own revenues in the last 3 years ",
        },
      ],
      name: "Next Steps",
    },
  ];
  @Input()
  selectedYear = "2015-16";
  @Input()
  cityId;
  ngOnInit(): void {
    console.log(this.data, "about indicator");
  }

  ngOnChanges(changes: SimpleChanges): void {}

  panelOpen(item) {
    let name = item.name.toLowerCase();
    if (name == "calculation") this.getCalculation(item);
    if (name == "peer comparison") this.getPeerComp(item);

    item.panelOpenState = true;
  }

  getCalculation(item, compare = "") {
    let totalRevenue;
    this.aboutService
      .avgRevenue(this.cityId, this.selectedYear, compare)
      .subscribe(
        (res) => {
          console.log(res, item);
          item.desc.map((value) => {
            let data = value.text.split("=");
            let name = data[0].split(" ").join("").toLowerCase();
            switch (name) {
              case "totalrevenue":
                data[1] = res["data"]?.amount.toFixed(2);
                break;
              case "stateulbtypeaverage":
                data[1] = res["data"]?.weightedAmount.toFixed(2);

              default:
                break;
            }
            data = data.join("= ");
            value.text = data;
          });
        },
        (error) => {}
      );
  }
  stateUlbMapping = JSON.parse(localStorage.getItem("stateUlbMapping"));
  ulbList = JSON.parse(localStorage.getItem("ulbList")).data;
  getPeerComp(item) {
    this.aboutService.compPeer(this.cityId, this.selectedYear).subscribe(
      (res) => {
        console.log(res, item, "compPeer");
        let descString = item.desc[0].text;
        descString = descString.split(" ");
        descString = descString.map((value) => {
          if (value == "STATE_NAME") value = this.ulbList[this.stateUlbMapping[res["data"].inStateUlbType.ulb._id]].state;
          if (value == "ULB_TYPE") value = this.ulbList[this.stateUlbMapping[res["data"].inStateUlbType.ulb._id]].ulbs.find(innerVal=>innerVal._id == res["data"].inStateUlbType.ulb._id).type;
          if (value == "ULB_NAME_STATE") value = this.ulbList[this.stateUlbMapping[res["data"].inStateUlbType.ulb._id]].ulbs.find(innerVal=>innerVal._id == res["data"].inStateUlbType.ulb._id).name;
          if (value == "ULB_INSATE") value = this.toCr(res["data"].inStateUlbType.amount);
          if (value == "ULB_NAME_INDIA") value = this.ulbList[this.stateUlbMapping[res["data"].inIndiaUlbType.ulb._id]]?.state;
          if (value == "ULB_IN-INDIA") value = this.toCr(res["data"].inIndiaUlbType.amount);
          return value;
        });
        item.desc[0].text = descString.join(" ")
      },
      (error) => {}
    );
  }

  toCr(value){
    return (value/10000000).toFixed(2)  
  }

  panelClose(item) {
    item.panelOpenState = false;
  }
}
