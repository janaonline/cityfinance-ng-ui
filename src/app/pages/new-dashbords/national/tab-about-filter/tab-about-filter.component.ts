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
import { NationalMapSectionService } from "../national-map-section/national-map-section.service";

@Component({
  selector: "app-tab-about-filter",
  templateUrl: "./tab-about-filter.component.html",
  styleUrls: ["./tab-about-filter.component.scss"],
})
export class TabAboutFilterComponent implements OnInit, OnChanges {
  constructor(
    protected router: Router,
    private _commonServices: CommonService,
    private nationalMapService: NationalMapSectionService
  ) {}
  public chart: Chart;
  @Input() data = [];
  @Input() tabIndex = 0;
  @Input() tabId = "61e150439ed0e8575c881028";
  @Input() cordsValue: number;

  tabData;
  aboutTab;
  activeFilter: any = [];
  selectedIndex: any;
  mainTab: any;
  stickyValue: boolean = false;
  ngOnInit(): void {
    this.nationalSubTab("Total Revenue", 0);
  }

  nationalSubTab(value, i) {
    this.selectedIndex = i;
    this.nationalMapService.setCurrentSubTabValue({
      data: value,
      HeadTab: this.mainTab,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.cordsValue && changes.cordsValue.currentValue) {
      if (this.cordsValue >= 750) {
        this.stickyValue = true;
      } else {
        this.stickyValue = false;
      }
    }
    if (changes.data && changes.data.currentValue) {
      this.activeTabFn(this.data[this.tabIndex]);
      this.router.navigate([
        // `dashboard/national/${this.tabId}?tabIndex=${this.tabIndex}`,
        `dashboard/national/${this.tabId}`,
      ]);
    }
    // if(changes.)
  }
  activeTabFn(item) {
    this.mainTab = item?.name;
    this.aboutTab = item?.subHeaders[0]?.mainContent[0]?.about;
    this.activeFilter = item?.subHeaders[0]?.mainContent[0]?.btnLabels;
    if (this.activeFilter) {
      this.nationalSubTab(this.activeFilter[0], 0);
    }
    // this.router.navigate([`dashboard/national/${item._id}`]);
  }
}
