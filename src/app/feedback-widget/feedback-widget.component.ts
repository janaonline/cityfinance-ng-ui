import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FeedbackWidgetService } from "./feedback-widget.service";

@Component({
  selector: "app-feedback-widget",
  template: `
    <div *ngIf="showFeedbackWidget" class="feedback-sticky"    [@slideIn] (click)="openFeedbackForm()">
    	<button type="button" class="btn-close position-absolute top-0 end-0 m-2" aria-label="Close" (click)="closeFeedbackWidget($event)"></button>
    	<p class="mb-1 text-primary fw-bold">We'd love your feedback!</p>
    	<p>We have just a few questions for you.</p>
    </div>`,
  styles: [
    `
    .feedback-sticky {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        cursor: pointer;
        background-color: white;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        padding: 1rem;
        border-radius: 5px;
        p {
            margin: 0;
        }
    }`,
  ],
  animations: [
    trigger("slideIn", [
      transition(":enter", [
        style({ transform: "translateY(-150%)" }),
        animate("600ms ease-out", style({ transform: "translateY(0%)" })),
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ transform: "translateY(-100%)" })),
      ]),
    ]),
  ],
})
export class FeedbackWidgetComponent implements OnInit, OnDestroy {
  public showFeedbackWidget: boolean = true;
  private sub: Subscription;
  private readonly formLink =
    "https://docs.google.com/forms/d/18eFx_KNwPIhbIB2BaEM4y3BneFqKWIPYMwB2hZGuU_g/edit#responses";

  constructor(private feedbackWidgetService: FeedbackWidgetService) {}

  ngOnInit(): void {
    this.sub = this.feedbackWidgetService.onRouteChange.subscribe(
      (showFeedback: boolean) => {
        this.showFeedbackWidget = showFeedback;
        // console.log("show feedback widget = ", this.showFeedbackWidget);
      }
    );
  }

  public openFeedbackForm(): void {
    window.open(this.formLink, "_blank");
  }

  public closeFeedbackWidget(event: Event): void {
    event.stopPropagation();
    this.showFeedbackWidget = false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
