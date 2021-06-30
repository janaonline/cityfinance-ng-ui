import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfmsListComponent } from './pfms-list.component';

describe('PfmsListComponent', () => {
  let component: PfmsListComponent;
  let fixture: ComponentFixture<PfmsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfmsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PfmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
