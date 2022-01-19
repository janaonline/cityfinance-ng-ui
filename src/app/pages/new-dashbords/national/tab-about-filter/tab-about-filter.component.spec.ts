import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAboutFilterComponent } from './tab-about-filter.component';

describe('TabAboutFilterComponent', () => {
  let component: TabAboutFilterComponent;
  let fixture: ComponentFixture<TabAboutFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAboutFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAboutFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
