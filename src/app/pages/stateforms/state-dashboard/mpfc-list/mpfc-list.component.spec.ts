import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpfcListComponent } from './mpfc-list.component';

describe('MpfcListComponent', () => {
  let component: MpfcListComponent;
  let fixture: ComponentFixture<MpfcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpfcListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpfcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
