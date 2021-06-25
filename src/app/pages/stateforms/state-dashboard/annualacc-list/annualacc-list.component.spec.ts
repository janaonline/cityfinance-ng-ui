import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualaccListComponent } from './annualacc-list.component';

describe('AnnualaccListComponent', () => {
  let component: AnnualaccListComponent;
  let fixture: ComponentFixture<AnnualaccListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualaccListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualaccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
