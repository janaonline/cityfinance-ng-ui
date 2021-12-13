import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsPublicationComponent } from './reports-publication.component';

describe('ReportsPublicationComponent', () => {
  let component: ReportsPublicationComponent;
  let fixture: ComponentFixture<ReportsPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsPublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
