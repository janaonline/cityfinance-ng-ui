import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { DalgoComponent } from "src/app/shared/components/dalgo/dalgo.component";

@Component({
    standalone: true,
    imports: [DalgoComponent, CommonModule], // Added CommonModule for *ngIf
    selector: "app-dalgo-city-brief",
    templateUrl: "./dalgo-city-brief.component.html",
    styleUrls: ['./dalgo-city-brief.component.scss']
})
export class DalgoCityBriefComponent implements OnInit { 
    isPublicRoute: boolean = false;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        // Subscribe to route data to check which path loaded the component
        this.route.data.subscribe(data => {
            this.isPublicRoute = data['isPublic'] || false;
        });
    }
}