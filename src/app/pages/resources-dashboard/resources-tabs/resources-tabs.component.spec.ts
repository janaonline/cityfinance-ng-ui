import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesTabsComponent } from './resources-tabs.component';

describe('ResourcesTabsComponent', () => {
  let component: ResourcesTabsComponent;
  let fixture: ComponentFixture<ResourcesTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
