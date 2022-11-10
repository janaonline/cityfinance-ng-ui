import { Component, OnInit } from "@angular/core";
import { ResourcesDashboardService } from "../../resources-dashboard.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: "app-e-learning-module",
  templateUrl: "./e-learning-module.component.html",
  styleUrls: ["./e-learning-module.component.scss"],
})
export class ELearningModuleComponent implements OnInit {
  constructor(protected resourcedashboard: ResourcesDashboardService,
    private sanitizer: DomSanitizer) {
    this.tUrl3 = this.sanitizer.bypassSecurityTrustResourceUrl(this.url3);
    this.tUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.url2);
    this.tUrl1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.url1);
  }
  tableau: any;
  viz: any;
  tUrl3;
  tUrl2;
  tUrl1;
  url3 = 'https://janaagraha-space.ispring.com/s/embed_player/8525d36c-e807-11ec-895e-92fe4b110abf';
  url1 = 'https://janaagraha-space.ispring.com/s/embed_player/4c0d68c2-b43d-11ec-833b-d66e7090dff8';
  url2 = 'https://janaagraha-space.ispring.com/s/embed_player/3e36ea40-cc5f-11ec-ab96-5ea30a0585b5'
  ngOnInit(): void {
    var placeholderDiv = document.getElementById("vizContainer");
    var obj = document.getElementById("obj");

    this.viz = new this.tableau.Viz(
      placeholderDiv,
      "https%3A%2F%2Fprod-apnortheast-a.online.tableau.com%2F",
      obj
    );
  }
  cardData = [
    {
      label: "Digitization of Properties Register",
      imgUrl:
        "../../../../../assets/new_dashBord_ftr_hdr/shutterstock_546307051/shutterstock_546307051.png",
      code: "first",
    },

    {
      label: "Valuation of Properties",
      imgUrl:
        "../../../../../assets/new_dashBord_ftr_hdr/Group 15744/Group 15744.png",
      code: "third",
    },
    {
      label: "Motivating Revenue Officials",
      imgUrl:
        "../../../../../assets/new_dashBord_ftr_hdr/Group 15745/Group 15745.png",
      code: "second",
    },
    // {
    //   label: "Motivating Revenue Officials",
    //   imgUrl:
    //     "../../../../../assets/new_dashBord_ftr_hdr/Group 15745/Group 15745.png",
    //   code: "fourth",
    // },
  ];
  showIframe = false;
  showTableau = false;
  showOtherIframe = false;
  openScorePer(item) {
    console.log("new item", { item });
    this.resourcedashboard.setShowCardValue(item);

    this.resourcedashboard.showCard.subscribe((res) => {
      console.log("gggg", res);
      // if (res) {
      this.showIframe = false;
      this.showTableau = false;
      this.showOtherIframe = false;
      // }
    });
    this.showIframe = false;
    this.showTableau = false;
    this.showOtherIframe = false;
    if (item.code == "first") {
      this.showTableau = true;
    } else if (item.code == "second") {
      this.showIframe = true;
    } else if (item.code == "third") {
      this.showOtherIframe = true;
    }

    console.log(item.label);
  }
}
