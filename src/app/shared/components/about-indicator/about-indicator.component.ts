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
  stateUlbMapping = JSON.parse(localStorage.getItem("ulbStateCodeMapping"));
  ulbList = JSON.parse(localStorage.getItem("ulbList")).data;
  getPeerComp(item) {
    this.aboutService.compPeer(this.cityId, this.selectedYear).subscribe(
      (res) => {
        console.log(res, item, "compPeer");
        item.desc[0].text = this.getConvertedDec(
          item.desc[0].text,
          res["data"],
          true
        );
        item.desc[1].text = this.getConvertedDec(
          item.desc[1].text,
          res["data"],
          false
        );
      },
      (error) => {}
    );
  }

  getConvertedDec(text, data, forUlbType = true) {
    console.log(text, "here");

    let descString = text;
    console.log(data[forUlbType ? "inStateUlbType" : "inState"]["ulb"]["_id"]);

    let ulbStateCode =
      this.stateUlbMapping[
        data[forUlbType ? "inStateUlbType" : "inState"]["ulb"]["_id"]
      ];
    descString = descString.split(" ");

    descString = descString.map((value) => {
      switch (value) {
        case "STATE_NAME":
          value = this.ulbList[ulbStateCode].state;
          break;
        case "ULB_TYPE":
          value = this.ulbList[ulbStateCode].ulbs.find(
            (innerVal) =>
              innerVal._id ==
              data[forUlbType ? "inStateUlbType" : "inState"].ulb._id
          ).type;
          break;
        case "ULB_NAME_STATE":
          value = this.ulbList[ulbStateCode].ulbs.find(
            (innerVal) =>
              innerVal._id ==
              data[forUlbType ? "inStateUlbType" : "inState"].ulb._id
          ).name;
          break;
        case "ULB_INSATE":
          value = this.toCr(
            data[forUlbType ? "inStateUlbType" : "inState"].amount
          );
          break;
        case "ULB_NAME_INDIA":
          value =
            this.ulbList[
              this.stateUlbMapping[
                data[forUlbType ? "inIndiaUlbType" : "inIndia"].ulb._id
              ]
            ]?.state;
          break;
        case "ULB_IN-INDIA":
          value = this.toCr(
            data[forUlbType ? "inIndiaUlbType" : "inIndia"].amount
          );
          break;
        case "STATE_REVENUE":
          value = this.toCr(data["totalRevenue"]);
          break;
        case "ULB_POPULATION":
          value =
            "(" +
            toPopulcationCategory(
              this.ulbList[ulbStateCode].ulbs.find(
                (innerVal) =>
                  innerVal._id ==
                  data[forUlbType ? "inStateUlbType" : "inState"].ulb._id
              ).population
            ) +
            ")";
          break;
        default:
          break;
      }
      return value;
    });
    return descString.join(" ");
  }

  toCr(value) {
    return (value / 10000000).toFixed(2);
  }

  panelClose(item) {
    item.panelOpenState = false;
  }
}

function toPopulcationCategory(population) {
  if (population < 100000) {
    return "<100K";
  } else if (100000 < population && population < 500000) {
    return "100K-500K";
  } else if (500000 < population && population < 1000000) {
    return "500K-1M";
  } else if (1000000 < population && population < 4000000) {
    return "1M-4M";
  } else {
    return "4M+";
  }
}
