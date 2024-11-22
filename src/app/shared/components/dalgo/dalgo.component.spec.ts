import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DalgoComponent } from './dalgo.component';

describe('DalgoComponent', () => {
  let component: DalgoComponent;
  let fixture: ComponentFixture<DalgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DalgoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DalgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
