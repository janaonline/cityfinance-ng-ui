import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-features-n-benefits',
  templateUrl: './features-n-benefits.component.html',
  styleUrls: ['./features-n-benefits.component.scss']
})
export class FeaturesNBenefitsComponent implements OnInit {

  isHighlightContainerScrolledIntoView: boolean;
  highlightNo: number = 0;
  interval: any;

  @ViewChild('highlightContainer', { static: false }) private highlightContainer: ElementRef<HTMLDivElement>;
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView() {
    if (this.highlightContainer) {
      const rect = this.highlightContainer.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;
      this.isHighlightContainerScrolledIntoView = topShown && bottomShown;

      if (this.isHighlightContainerScrolledIntoView) {
        if (this.highlightNo == 0) {
          this.highlightNo++;
          this.interval = setInterval(() => {
            if (this.highlightNo < this.items.length)
              this.highlightNo++;
          }, 5000);
        }
      } else {
        if (this.interval)
          clearInterval(this.interval);
        this.highlightNo = 0;
      }

    }
  }


  items: {
    title: string,
    description: string
  }[] = [
      {
        title: "Enhance City Level Revenue Generation",
        description: "Participation enhances revenue generation by sharing data-driven insights, best practices, and strategies for tax and fee collection, ultimately providing more resources for city services and development."
      },
      {
        title: "Encourage Grants management",
        description: "Participation allows cities to improve grants management with access to grant information, eligibility criteria, and application processes. Efficient grants management secures funding for critical initiatives."
      },
      {
        title: "Improve wise-budget management, reporting and building an ecosystem",
        description: ""
      },
      {
        title: "Monitor money flow and encourage SFC (Special Funding Commission) for eligible cities",
        description: ""
      },
      {
        title: "Manage capital projects",
        description: ""
      },
    ]
  constructor() { }

  ngOnInit(): void {
  }

}
