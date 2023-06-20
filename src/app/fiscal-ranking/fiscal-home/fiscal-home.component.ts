import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DownloadPopupComponent } from '../download-popup/download-popup.component';
import { AuthService } from "src/app/auth/auth.service";
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
    private renderer: Renderer2,
    private authService: AuthService) {
    this._router.events.subscribe((event) => {
      this.isLoggedIn = this.authService.loggedIn();
    });
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
  isLoggedIn: boolean = false;
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

  fqCardData = [
    {
      image: "../../../assets/M FIGMA/newDraft.png",
      title: "Final Guidelines",
      // text:`“These are draft guidelines. Please share feedback, if any,
      // before <span class="clr"> 15th January, 2023 </span> via email on <span class="mailId">rankings@cityfinance.in</span>” `,
      text: `These are final guidelines. Please <a class="mailId" href='https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FR_Module/Shared/City%20Finance%20Rankings%202022_Draft%20Guidelines_84d751ba-3050-4216-9bdb-ebf5e7ee8304.pdf' target='_blank'> click here </a> to open the Draft guidelines.`,
      url: `https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FiscalRanking/City_Finance_Rankings_2022_Final_Guidelines_March_2023_85825255-1ad9-4f9f-a44c-044210682c7b.pdf`,
      // url:`https://jccd-cityfinance-staging2.s3.ap-south-1.amazonaws.com/FiscalRanking/CFR_Final_guideline_2a6b5467-b2f2-456b-b38d-a0387d5f7709.pdf`,
      isModal: true,
      icon_down: '',
      section: 'download_file',
      key: 'draftGuidelines'
    },
    {
      image: "../../../assets/M FIGMA/newBroch.png",
      title: "Brochure",
      text: "",
      // url: 'https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FR_Module/Shared/City%20Finance%20Rankings%20%202022_Brochure.pdf',
      url: `https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FiscalRanking/City_Finance_Rankings_2022_Brochure_March_2023_3708f180-5be7-41ef-96c9-2d98db398575.pdf`,
      // url:`https://jccd-cityfinance-staging2.s3.ap-south-1.amazonaws.com/FiscalRanking/CFR_brochure_d49ffe27-951b-41d1-8153-e54f88655d54.pdf`,
      isModal: false,
      icon_down: '',
      section: 'download_file',
      key: 'brochure'
    },
    {
      image: "../../../assets/M FIGMA/dvr_black_24dp.svg",
      title: "Know more",
      text: "",
      videos : [
        {
          title: 'Click here for Launch Video',
          url: `https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FiscalRanking/knowMoreVideo_6b2e991a-1d08-433f-b566-a61f515cba53.mp4`,
          key: 'newVideo',
          isActive: true,
          id: '1'
        },
        {
          title: 'Click here for Intro Video',
          url: `https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FiscalRanking/CFR_Portal_Video_Go_Live_fc20cbd7-303f-4ef0-aa98-1b5e4c35dc19.mp4`,
          key: 'oldVideo',
          isActive: false,
          id: '2'
        }
      ],
      isModal: true,
      icon_down: '',
      section: 'play_video',
      key: 'video'
    },
    {
      image: "../../../assets/M FIGMA/newDraft.png",
      title: "Contact Details",
      // text:`“These are draft guidelines. Please share feedback, if any,
      // before <span class="clr"> 15th January, 2023 </span> via email on <span class="mailId">rankings@cityfinance.in</span>” `,
      text: `Please email <a class="contactDetails" href='mailto:rankings@cityfinance.in' target='_blank'> rankings@cityfinance.in </a> for any queries. Please download the file for regional helpline numbers.`,
      url: `https://jana-cityfinance.s3.ap-south-1.amazonaws.com/FiscalRanking/city_finance_rankings_2022_regional_helpline_number_7087a0e5-ad16-4a4a-8533-df05a9727520.pdf`,
      // url:`https://jccd-cityfinance-staging2.s3.ap-south-1.amazonaws.com/FiscalRanking/CFR_Final_guideline_2a6b5467-b2f2-456b-b38d-a0387d5f7709.pdf`,
      isModal: true,
      icon_down: '',
      section: 'download_file',
      key: 'draftGuidelines'
    },
  ]

  ngOnInit(): void {
    this.openPopup(this.fqCardData[2]);
    this.fiscal.getLandingPageCard().subscribe((data: any) => {
      console.log("this myu data======>", data.data)
      this.setDisplayItem();
      this.filterFromObj(data?.data);
    },
      (error) => {
        alert('Network issues');
      });

  }
  @ViewChild('carousel') _carousel: ElementRef<HTMLInputElement>;
  ngAfterViewInit(): void {
    const myCarousel = this._carousel.nativeElement;
    const carousel = $(myCarousel).carousel();
  }

  filterFromObj(data) {
    console.log('data,,,,', data);
    data?.forEach((el) => {
      if (el?.section == "Objective") {
        this.objresult.push(el);
      }
      if (el?.section == "Assessment Parameters") {
        this.assresult.push(el);
      }
      if (el?.section == "Salient Features") {
        this.salientresult.push(el);
      }
      if (el?.section == "Ranking Categories") {
        this.rankresult.push(el);
      }
      if (el?.section == "Banner Icon") {
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
  downloadClick(item) {
    console.log('item', item);
    if (item?.isModal) {
      this.openPopup(item);
    } else {
      this.simpleDownload(item);
    }
  }
  simpleDownload(item) {
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', `${item?.url}`);
    if (item?.key == 'brochure') {
      link.setAttribute('download', `City Finance Rankings 2022_Brochure.pdf`);
    } else {
      link.setAttribute('download', `City Finance Rankings 2022_${item?.title}.pdf`);
    }
    link.click();
    link.remove();
  }
  openPopup(item) {
    let wid = 'fit-content';
    let hi = 'fit-content';
    let maxH = '90vh';
    let maxw = '95vw'
    if (item?.key == 'video') {
      wid = '50rem';
      hi = '';
      maxH = ''
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
