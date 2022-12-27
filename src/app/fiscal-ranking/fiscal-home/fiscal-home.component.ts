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

  fqCardData= [
    {
      image : "../../../assets/M FIGMA/newDraft.png",
      title: "Draft Guidelines",
      text: `This is a draft guidelines document only. The Ministry welcomes any feedback,
       comments and suggestions on this document, to be submitted via email on <span class="mailId">rankings@cityfinance.in</span>
       before <span class="clr"> 10th January, 2023</span>.The final guidelines document shall be published by the Ministry after
       considering the feedback received.`,
      url: `https://jana-cityfinance.s3.ap-south-1.amazonaws.com/CFR%20guideline-22%20dec%20low%20res_07265488-8e9b-41cd-a0f6-4db831fb9872.pdf`,
      isModal: true,
      icon_down: '',
      section: 'download_file',
      key: 'draftGuidelines'
     },
    //  {
    //   image : "../../../assets/M FIGMA/faqIcon.png",
    //   title: "FAQ",
    //   text: "",
    //   url: `https://democityfinance.s3.ap-south-1.amazonaws.com/City%20Finance%20Rankings%202022_FAQs_ee0abc57-8114-4fa2-9d58-b444adf6bf64.pdf`,
    //   isModal: false,
    //   icon_down: '',
    //   section: 'download_file',
    //   key: 'faq'
    //  },
     {
      image : "../../../assets/M FIGMA/newBroch.png",
      title: "Brochure",
      text: "",
      url: 'https://jana-cityfinance.s3.ap-south-1.amazonaws.com/City%20Finance%20Rankings%202022_Brochure_12fb3ede-e2cd-4756-92ec-0fca129a9109.pdf',
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

    console.log('file..banner', this.iconresult);

  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  setDisplayItem() {
   // console.log("this myu data======>123", this.assresult);
    this.assresult.forEach((el) => {
      el.bakePage = false;
    });
   // console.log("this myu data======>235", this.assresult);
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
      if(item?.key == 'brochure'){
        link.setAttribute('download', `City Finance Rankings 2022_Brochure.pdf`);
      }else{
        link.setAttribute('download', `City Finance Rankings 2022_${item?.title}.pdf`);
      }
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
