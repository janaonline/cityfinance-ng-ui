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
  headOfAccount = "Revenue";
  @Input()
  filterName;
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
  copyData;
  @Input()
  selectedYear = "2015-16";
  @Input()
  cityId;
  lastOpenPanel;
  loading = false;
  ulbList = JSON.parse(localStorage.getItem("ulbList")).data;
  stateCode = JSON.parse(localStorage.getItem("ulbStateCodeMapping"));
  ngOnInit(): void {
    console.log(this.data, "about indicator");
  }
  ulbsData = JSON.parse(localStorage.getItem("ulbMapping"));
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.copyData = JSON.parse(JSON.stringify(this.data));
    }
  }

  panelOpen(item, index) {
    if (this.lastOpenPanel) {
      this.panelClose(this.lastOpenPanel);
    }
    let name = item.name.toLowerCase();
    switch (name) {
      case "about this indicator":
        this.addAnchorTag(
          item,
          1,
          "/resources-dashboard/learning-center/bestPractices",
          "Know more...",
          index
        );
        break;
      case "calculation":
        this.getCalculation(item, "", index);
        break;
      case "analysis":
      case "peer comparison":
        this.getPeerComp(item, index);
        break;
      case "next steps":
        this.getNextStep(item, index);
        break;
      default:
        break;
    }
    item.panelOpenState = true;
    this.lastOpenPanel = item;
  }

  getNextStep(item, parentIndex) {
    item.desc.forEach((element, i) => {
      if (element.text.includes("STATE_NAME")) {
        element.text = element.text.split("STATE_NAME");
        let stateName = this.ulbsData[this.cityId].name;
        element.text = element.text.join(stateName);
      }
      if (element.text.includes("toolkit") || element.text.includes("1")) {
        let temp = element.text.split(".")[1];
        element.text = element.text.split(".")[0] + ".";
        this.addAnchorTag(
          item,
          i,
          "http://localhost:4200/resources-dashboard/learning-center/toolkits",
          temp ? temp : "Property tax reforms toolkit (published by MoHUA)",
          parentIndex
        );
      }
      if (element.text.includes("E-learning") || element.text.includes("2")) {
        let temp = element.text.split(".")[1];
        element.text = element.text.split(".")[0] + ".";
        this.addAnchorTag(
          item,
          i,
          "http://localhost:4200/resources-dashboard/learning-center/eLearning",
          temp
            ? temp
            : "E-learning modules on implementing property tax reforms",
          parentIndex
        );
      }
      if (element.text.includes("Best") || element.text.includes("3")) {
        let temp = element.text.split(".")[1];
        element.text = element.text.split(".")[0] + ".";
        this.addAnchorTag(
          item,
          i,
          "http://localhost:4200/resources-dashboard/learning-center/bestPractices",
          temp ? temp : "Best Practices on property tax reforms",
          parentIndex
        );
      }
      if (element.text.includes("state level")) {
      }
      if (element.text.includes("state level")) {
        let text = this.copyData[parentIndex].desc[i].text;
        if (text.includes("STATE_NAME")) {
          text = text.split("STATE_NAME");
          let stateName = this.ulbsData[this.cityId].name;
          text = text.join(stateName);
        }
        this.addAnchorTag(
          item,
          i,
          `/dashboard/state?stateId=${
            this.ulbList[this.stateCode[this.cityId]]._id
          }`,
          text,
          parentIndex
        );
        element.text = "";
      }
      if (element.text.includes("national level")) {
        let text = this.copyData[parentIndex].desc[i].text;
        this.addAnchorTag(
          item,
          i,
          "/dashboard/national?tabIndex=1",
          text,
          parentIndex
        );
        element.text = "";
      }
    });
  }

  addAnchorTag(item, index, link, text, parentIndex) {
    let aTag = document.createElement("a");
    aTag.href = link;
    aTag.innerHTML = text;
    let pTag = document.getElementById(parentIndex + item.name + index);
    if ((pTag.hasOwnProperty("children"), pTag.children.length == 0))
      pTag.appendChild(aTag);
  }

  getCalculation(item, compare = "", index) {
    let totalRevenue;
    let param = {
      ulb: this.cityId,
      financialYear: this.selectedYear,
      compare,
      headOfAccount: this.headOfAccount,
      filterName: this.filterName,
    };
    this.loading = true;
    this.aboutService.avgRevenue(param).subscribe(
      (res) => {
        let apiData: any = Array.isArray(res["data"])
          ? res["data"][0]
          : res["data"];
        item.desc.map((value) => {
          let data = value.text.split("=");
          let name = data[0].split(" ").join("").toLowerCase();
          switch (name) {
            case "totalrevenue":
              data[1] = "₹ " + Math.round(apiData?.amount / 10000000) + "Cr";
              break;
            case "totalexpenditure":
              data[1] = "₹ " + Math.round(apiData?.expense / 10000000) + "Cr";
              break;
            case "stateulbtypeaverage":
              data[1] =
                "₹ " + Math.round(apiData?.weightedAmount / 10000000) + "Cr";

            default:
              break;
          }
          data = data.join("= ");
          value.text = data;
        });
        setTimeout(() => {
          this.addImage(item, index);
        }, 0);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  addImage(item, index) {
    let elementIndex = item.desc.findIndex(
      (value) => value.text == "FORMULA_IMG"
    );
    if (elementIndex === -1) return;
    let pTag = document.getElementById(index + item.name + elementIndex);
    pTag.innerHTML = "";
    let imgTag = document.createElement("img");
    imgTag.src = "../../assets/formula.png";
    pTag.appendChild(imgTag);
  }
  stateUlbMapping = JSON.parse(localStorage.getItem("ulbStateCodeMapping"));
  getPeerComp(item, index) {
    this.loading = true;
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
        this.loading = false;
        setTimeout(() => {
          this.addUl(item, index);
        }, 10);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  addUl(item, index) {
    item.desc.forEach((value, i) => {
      let ul = document.createElement("ul");
      let temp = value.text.split("=>");
      temp.forEach((val, j) => {
        let li;
        if (j == 0) {
          li = document.createElement("strong");
          li.innerHTML = val;
        } else {
          li = document.createElement("li");
          li.innerHTML = val;
        }
        ul.appendChild(li);
      });
      let tt = document.getElementById(index + item.name + i);
      tt.innerHTML = "";
      tt.appendChild(ul);
    });
  }

  getConvertedDec(text, data, forUlbType = true) {
    let descString = text;
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
            toPopulationCategory(
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
    let newVal = value / 10000000;
    if (isNaN(newVal)) return 0;
    return newVal.toFixed(2);
  }

  panelClose(item) {
    item.panelOpenState = false;
  }
}

function toPopulationCategory(population) {
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
