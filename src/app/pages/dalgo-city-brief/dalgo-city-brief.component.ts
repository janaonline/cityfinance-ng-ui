import { Component } from "@angular/core";
import { DalgoComponent } from "src/app/shared/components/dalgo/dalgo.component";

@Component({
    standalone: true,
    imports: [DalgoComponent],
    selector: "app-dalgo-city-brief",
    templateUrl: "./dalgo-city-brief.component.html",
    styleUrls: ['./dalgo-city-brief.component.scss']
})
export class DalgoCityBriefComponent { }