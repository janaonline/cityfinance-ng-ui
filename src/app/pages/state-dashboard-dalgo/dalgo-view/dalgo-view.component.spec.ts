import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DalgoViewComponent } from './dalgo-view.component';

describe('DalgoViewComponent', () => {
  let component: DalgoViewComponent;
  let fixture: ComponentFixture<DalgoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DalgoViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DalgoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
