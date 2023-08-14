import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { StateResourceService } from '../../mohua-form/state-resource-manager/state-resource.service';

@Component({
  selector: 'app-state-resources',
  templateUrl: './state-resources.component.html',
  styleUrls: ['./state-resources.component.scss']
})
export class StateResourcesComponent implements OnInit {

  @ViewChildren('scroller') scrollers: QueryList<ElementRef>;

  categoryWiseResources = [];

  constructor(
    private stateResourceService: StateResourceService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData() {
    this.stateResourceService.getList().subscribe(({ data }: any) => {
      this.categoryWiseResources = data;
    })
  }

  scroll(selector: string, movement: number) {
    console.log({ selector, movement});
    const scroller = this.scrollers.find(scroller => scroller.nativeElement.id == selector);
    const scrollerElement: HTMLElement = scroller?.nativeElement;
    scrollerElement?.scrollBy({ left: movement, behavior: 'smooth'});
  }
}
