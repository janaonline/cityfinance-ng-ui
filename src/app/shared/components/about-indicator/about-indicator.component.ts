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
  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((param) => {
      this.cityId = param.cityId;
    });
    console.log(this.data, "about indicator");
  }
  cityId;

  ngOnChanges(changes: SimpleChanges): void {}

  panelOpen(item) {
    console.log(item);
    if (item.name.toLowerCase() == "calculation") this.getCalculation(item);

    item.panelOpenState = true;
  }

  getCalculation(item) {
    this.aboutService.avgRevenue(this.cityId, this.selectedYear).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {}
    );
  }

  panelClose(item) {
    item.panelOpenState = false;
  }
}
