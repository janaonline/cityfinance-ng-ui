import { Component, OnInit } from "@angular/core";
import { take } from "rxjs/operators";
import { CommonService } from "src/app/shared/services/common.service";

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  stateslist = [];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.states.pipe(take(1)).subscribe({
      next: (res) => {
        const filteredStates = res.filter((state) => state.accessToXVFC);
        sessionStorage.setItem("statesData", JSON.stringify(filteredStates));
        this.stateslist = filteredStates;
      },
      error: (err) => console.error("Failed to fetch states:", err),
    });

    this.commonService.loadStates(true);
  }
}
