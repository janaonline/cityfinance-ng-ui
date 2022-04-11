import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "src/app/shared/services/common.service";

@Component({
  selector: "app-tab-about-filter",
  templateUrl: "./tab-about-filter.component.html",
  styleUrls: ["./tab-about-filter.component.scss"],
})
export class TabAboutFilterComponent implements OnInit, OnChanges {
  constructor(
    protected router: Router,
    private _commonServices: CommonService
  ) {}
  public chart: Chart;
  @Input() data = [];
  @Input() tabIndex = 0;
  @Input() tabId = "61e150439ed0e8575c881028";

  tabData;
  aboutTab;
  ngOnInit(): void {
    console.log("tab data", this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.activeTabFn(this.data[this.tabIndex]);
      this.router.navigate([
        // `dashboard/national/${this.tabId}?tabIndex=${this.tabIndex}`,
        `dashboard/national/${this.tabId}`,
      ]);
    }
  }
  activeTabFn(item) {
    this.aboutTab = item?.subHeaders[0]?.mainContent[0]?.about;
    // this.router.navigate([`dashboard/national/${item._id}`]);
  }
}
