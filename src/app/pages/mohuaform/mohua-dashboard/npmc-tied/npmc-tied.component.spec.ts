import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpmcTiedComponent } from './npmc-tied.component';

describe('NpmcTiedComponent', () => {
  let component: NpmcTiedComponent;
  let fixture: ComponentFixture<NpmcTiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpmcTiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpmcTiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
