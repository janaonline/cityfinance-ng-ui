import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMenuTemplateComponent } from './left-menu-template.component';

describe('LeftMenuTemplateComponent', () => {
  let component: LeftMenuTemplateComponent;
  let fixture: ComponentFixture<LeftMenuTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftMenuTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMenuTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
