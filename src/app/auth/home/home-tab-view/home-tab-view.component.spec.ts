import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabViewComponent } from './home-tab-view.component';

describe('HomeTabViewComponent', () => {
  let component: HomeTabViewComponent;
  let fixture: ComponentFixture<HomeTabViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
