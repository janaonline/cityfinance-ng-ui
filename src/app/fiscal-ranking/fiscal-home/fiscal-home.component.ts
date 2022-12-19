import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DownloadPopupComponent } from '../download-popup/download-popup.component';
@Component({
  selector: 'app-fiscal-home',
  templateUrl: './fiscal-home.component.html',
  styleUrls: ['./fiscal-home.component.scss']
})
export class FiscalHomeComponent implements OnInit {

  constructor(
    private fiscal: FiscalRankingService,
    private _router: Router,
    private dialog: MatDialog,
    private renderer: Renderer2) {
    // this.fiscal.getHeroes().subscribe((data:any)=>{
    //   this.result = data
    //   console.log("this myu data======>",this.result)
    // })
  }
  public objresult = [];
  public assresult = [];
  public salientresult = [];
  public rankresult = [];
  public iconresult = [];


  @ViewChild('highlightContainer', { static: false }) private highlightContainer: ElementRef<HTMLDivElement>;
  isHighlightContainerScrolledIntoView: boolean;
  highlightNo: number = 0;
  interval: any;

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
            if (this.highlightNo < 4)
              this.highlightNo++;
          }, 5 * 1000);
        }
      } else {
        if (this.interval)
          clearInterval(this.interval);
        this.highlightNo = 0;
      }

    }
  }

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  src = "../../../assets/M FIGMA/laurentiu-morariu-8XZTZIfuNrM-unsplash 1.jpg";
  // arrReward:Array<any>=[
  //   {
  //   image : "../../../assets/M FIGMA/medal 1.png",
  //   title: "Rewards & Recognition",
  //   text: "Reward & recognise ULBs that have taken positive step towards revenue generation, expenditure management & building effective fiscal govenement systems."
  //   },
  //   {
  //     image : "../../../assets/M FIGMA/collaboration 1.png",
  //     title: "Peer Learnings",
  //     text: "Facilitate peer learnings by building a collaborative and learning environment that would enable scaling best oractises across ULBs."
  //   },
  //   {
  //       image : "../../../assets/M FIGMA/competition 1.png",
  //       title: "Healthy Competition",
  //       text: "Fuel healthy competition among ULBs & states with an aim of building a robust municipal finance ecosystem and a culture of financially healthy and sustainable ULBs."
  //   },
  //   {
  //     image : "../../../assets/M FIGMA/online-library 1.png",
  //     title: "Platform for Support",
  //     text: "Platform for identifying technical support needs of states/cities for implementing municipal finance reforms and informing policy decisions at union/state level."
  //   }
  // ]

  // arrReward2:Array<any>=[
  //   {
  //   image : "../../../assets/M FIGMA/graph 1.png",
  //   title: "Resource Mobilization ",
  //   text: "signifies the size and growth trend in the total receipts and own revenues of the ULB..."
  //   },
  //   {
  //     image : "../../../assets/M FIGMA/doughnut 1.png",
  //     title: "Expenditure Performance ",
  //     text: "signifies size and quality of expenditure (spending) towards building infrastructure..."
  //   },
  //   {
  //       image : "../../../assets/M FIGMA/agreement 1.png",
  //       title: "Fiscal Governance ",
  //       text: "refers to robustness of systems in place with respect to transparency and accountability..."
  //   },
  // ]


  // arrReward3:Array<any>=[
  //   {
  //   image : "../../../assets/M FIGMA/medal (1) 1.png",
  //   title: "Simple Ranking Methodology",
  //   text: "All ULBs are required to submit their key financial data and upload their financial documents on the www.cityfinance.in"
  //   },
  //   {
  //     image : "../../../assets/M FIGMA/upload 1.png",
  //     title: "100% Paperless Process",
  //     text: "All ULBs are required to submit their key financial data and upload their financial documents on the www.cityfinance.in"
  //   },
  //   {
  //       image : "../../../assets/M FIGMA/collection 1.png",
  //       title: "3 Data sources",
  //       text: "Audited Annual Accounts, Approved Annual Budget, Self-reported financial details."
  //   },
  // ]

  // arrReward4:Array<any>=[
  //   {
  //   image : "../../../assets/M FIGMA/city 1.png",
  //   title: "Above 4 Million ",
  //   },
  //   {
  //     image : "../../../assets/M FIGMA/city 1 (1).png",
  //     title: "1 Million - 4 Million ",
  //   },
  //   {
  //       image : "../../../assets/M FIGMA/city 1 (2).png",
  //       title: "100K - 1 Million ",

  //   },
  //   {
  //     image : "../../../assets/M FIGMA/city 1 (3).png",
  //     title: "Less than 100,000 ",

  // },
  // ]
  fqCardData= [
    {
      image : "../../../assets/M FIGMA/draftIcon.png",
      title: "Draft Guidelines",
      text: `This is a draft guidelines document only. The Ministry welcomes any feedback,
       comments and suggestions on this document, to be submitted via email on <span class="mailId">rankings@cityfinance.in</span>
       before <span class="clr"> 10th January, 2023</span>.The final guidelines document shall be published by the Ministry after
       considering the feedback received.`,
      url: `https://democityfinance.s3.ap-south-1.amazonaws.com/City%20Finance%20Rankings%202022_Guidelines_bfbcc3a6-15a6-4a23-b21f-63590a514c4b.pdf`,
      isModal: true,
      icon_down: '',
      section: 'download_file',
      key: 'draftGuidelines'
     },
     {
      image : "../../../assets/M FIGMA/faqIcon.png",
      title: "FAQ",
      text: "",
      url: `https://democityfinance.s3.ap-south-1.amazonaws.com/City%20Finance%20Rankings%202022_FAQs_ee0abc57-8114-4fa2-9d58-b444adf6bf64.pdf`,
      isModal: false,
      icon_down: '',
      section: 'download_file',
      key: 'faq'
     },
     {
      image : "../../../assets/M FIGMA/brochIcon.png",
      title: "Brochure",
      text: "",
      url: 'https://democityfinance.s3.ap-south-1.amazonaws.com/Cityfinance%20Brochure_12f6679f-129b-43b5-ab47-2b7304cc36df.pdf',
      isModal: false,
      icon_down: '',
      section: 'download_file',
      key: 'brochure'
     },
  ]
  ngOnInit(): void {
    this.fiscal.getLandingPageCard().subscribe((data: any) => {
      function canobjective(res) {
        if (res.section == "Objective") {
          return res;
        }
      }
      this.objresult = data.data.filter(canobjective);
      function canassement(res) {
        if (res.section == "Assessment Parameters") {
          return res;
        }
      }
      this.assresult = data.data.filter(canassement);

      // "Salient Features"
      function cansalient(res) {
        if (res.section == "Salient Features") {
          return res;
        }
      }
      this.salientresult = data.data.filter(cansalient);

      // "Ranking Categories"
      function canranking(res) {
        if (res.section == "Ranking Categories") {
          return res;
        }
      }
      this.rankresult = data.data.filter(canranking);

      //"icon 3"
      function canicon(res) {
        if (res.section == "Banner Icon") {
          return res;
        }
      }
      this.iconresult = data.data.filter(canicon);
      console.log("this myu data======>", data.data)
      this.setDisplayItem()
    })
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  setDisplayItem() {
    console.log("this myu data======>123", this.assresult);
    this.assresult.forEach((el) => {
      el.bakePage = false;
    });
    console.log("this myu data======>235", this.assresult);
  }
  selItem = false;
  readMore(data, ind) {
    console.log('display', data, ind);
    data.bakePage = true;
  }
  readLess(data, ind) {
    console.log('display', data, ind);
    data.bakePage = false;
  }
  truncateChar(text: string): string {
    let charlimit = 86;
    if (!text || text.length <= charlimit) {
      return text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + "...";
    return shortened;
  }
  downloadClick(item){
    console.log('item', item);
    if(item?.isModal){
     this.openPopup(item);
    }else{
      this.simpleDownload(item);
    }
  }
  simpleDownload(item){
    const link = this.renderer.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', `${item?.url}`);
      link.setAttribute('download', `CityFinance_Ranking_2022_${item?.key}.pdf`);
      link.click();
      link.remove();
  }
  openPopup(item){
    const dialogRef = this.dialog.open(DownloadPopupComponent, {
      data: item,
      width: "fit-content",
      height: "fit-content",
      maxHeight: "90vh",
      // panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }
}
