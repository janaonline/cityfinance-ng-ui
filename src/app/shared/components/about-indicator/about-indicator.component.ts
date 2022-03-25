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
  @Input()
  selectedYear = "2015-16";
  @Input()
  cityId;
  lastOpenPanel;
  loading = false;
  ngOnInit(): void {
    console.log(this.data, "about indicator");
  }
  ulbsData = JSON.parse(localStorage.getItem("ulbMapping"));
  ngOnChanges(changes: SimpleChanges): void {}

  panelOpen(item, index) {
    if (this.lastOpenPanel) {
      this.panelClose(this.lastOpenPanel);
    }
    let name = item.name.toLowerCase();
    if (name == "about this indicator")
      this.addAnchorTag(
        item,
        1,
        "/resources-dashboard/learning-center/bestPractices",
        "Know more...",
        index
      );
    if (name == "calculation") this.getCalculation(item, "", index);
    if (name == "peer comparison" || name == "analysis")
      this.getPeerComp(item, index);
    if (name == "next steps") this.getNextStep(item, index);

    item.panelOpenState = true;
    this.lastOpenPanel = item;
  }

  getNextStep(item, parentIndex) {
    item.desc.forEach((element, i) => {
      if (i == 1) {
        element.text = element.text.split("STATE_NAME");
        let stateName = this.ulbsData[this.cityId].state;
        element.text = element.text.join(stateName);
      }
      if (element.text.includes("toolkit")) {
        let temp = element.text.split(".")[1];
        element.text = element.text.split(".")[0] + ".";
        this.addAnchorTag(
          item,
          i,
          "http://localhost:4200/resources-dashboard/learning-center/toolkits",
          temp,
          parentIndex
        );
      }
      if (element.text.includes("E-learning")) {
        let temp = element.text.split(".")[1];
        element.text = element.text.split(".")[0] + ".";
        this.addAnchorTag(
          item,
          i,
          "http://localhost:4200/resources-dashboard/learning-center/eLearning",
          temp,
          parentIndex
        );
      }
      if (element.text.includes("Best")) {
        let temp = element.text.split(".")[1];
        element.text = element.text.split(".")[0] + ".";
        this.addAnchorTag(
          item,
          i,
          "http://localhost:4200/resources-dashboard/learning-center/bestPractices",
          temp,
          parentIndex
        );
      }
    });
  }

  addAnchorTag(item, index, link, text, parentIndex) {
    let aTag = document.createElement("a");
    aTag.href = link;
    aTag.innerHTML = text;
    let pTag = document.getElementById(parentIndex + item.name + index);
    console.log(pTag, "tag", index + 1 + item.name, "id");

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
              data[1] = apiData?.amount.toFixed(2);
              break;
            case "totalexpenditure":
              data[1] = apiData?.expense.toFixed(2);
              break;
            case "stateulbtypeaverage":
              data[1] = apiData?.weightedAmount.toFixed(2);

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
  ulbList = JSON.parse(localStorage.getItem("ulbList")).data;
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
      temp.forEach((val) => {
        let li = document.createElement("li");
        li.innerHTML = val;
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
