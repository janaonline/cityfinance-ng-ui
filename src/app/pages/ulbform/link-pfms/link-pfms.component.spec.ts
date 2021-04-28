import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPFMSComponent } from './link-pfms.component';

describe('LinkPFMSComponent', () => {
  let component: LinkPFMSComponent;
  let fixture: ComponentFixture<LinkPFMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkPFMSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkPFMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
