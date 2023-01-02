import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DownloadPopupComponent } from '../download-popup/download-popup.component';
declare var $: any;
@Component({
  selector: 'app-fiscal-home',
  templateUrl: './fiscal-home.component.html',
  styleUrls: ['./fiscal-home.component.scss']
})
export class FiscalHomeComponent implements OnInit, AfterViewInit {

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
      text:`“These are draft guidelines. Please share feedback, if any, before <span class="clr"> 15th January, 2023 </span> via email on <span class="mailId">rankings@cityfinance.in</span>” `,
      // url: `https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FR_Module/Shared/City%20Finance%20Rankings%20%202022_Draft%20Guidelines.pdf`,
      url: `https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FR_Module/Shared/City%20Finance%20Rankings%202022_Draft%20Guidelines_84d751ba-3050-4216-9bdb-ebf5e7ee8304.pdf`,
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
      url: 'https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FR_Module/Shared/City%20Finance%20Rankings%20%202022_Brochure.pdf',
      isModal: false,
      icon_down: '',
      section: 'download_file',
      key: 'brochure'
     },
        {
      image : "../../../assets/M FIGMA/dvr_black_24dp.svg",
      title: "Know more",
      text: "",
      url: `https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FR_Module/Shared/AV_City%20Finance%20Rankings%20V2_ec4d0b75-9ce8-4b2c-802f-8058bcf995cc.mp4`,
      isModal: true,
      icon_down: '',
      section: 'play_video',
      key: 'video'
     },
  ]

  ngOnInit(): void {
    this.openPopup(this.fqCardData[2]);
    this.fiscal.getLandingPageCard().subscribe((data: any) => {
        console.log("this myu data======>", data.data)
        this.setDisplayItem();
        this.filterFromObj(data?.data);
    },
    (error)=>{
      alert('Network issues');
    });

  }
  @ViewChild('carousel') _carousel: ElementRef<HTMLInputElement>;
  ngAfterViewInit(): void {
    const myCarousel = this._carousel.nativeElement;
    const carousel = $(myCarousel).carousel();
  }

  filterFromObj(data){
    console.log('data,,,,', data);
    data?.forEach((el)=>{
     if(el?.section == "Objective"){
       this.objresult.push(el);
      }
     if(el?.section == "Assessment Parameters"){
      this.assresult.push(el);
      }
     if(el?.section == "Salient Features"){
      this.salientresult.push(el);
     }
     if(el?.section == "Ranking Categories"){
      this.rankresult.push(el);
     }
     if(el?.section == "Banner Icon"){
      this.iconresult.push(el);
     }
   });
    this.iconresult.sort((a, b) => a.seq - b.seq);
    console.log('array', this.objresult);
    console.log('array', this.iconresult);
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
    let wid = 'fit-content';
    let hi = 'fit-content';
    let maxH = '90vh';
    let maxw = '95vw'
    if(item?.key == 'video'){
      wid = '50rem';
      hi = '';
      maxH= ''
    }
    const dialogRef = this.dialog.open(DownloadPopupComponent, {
      data: item,
      width: wid,
      height: hi,
      maxHeight: maxH,
      maxWidth: maxw
      // panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }
}
