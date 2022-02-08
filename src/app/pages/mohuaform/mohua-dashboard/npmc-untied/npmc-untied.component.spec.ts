import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpmcUntiedComponent } from './npmc-untied.component';

describe('NpmcUntiedComponent', () => {
  let component: NpmcUntiedComponent;
  let fixture: ComponentFixture<NpmcUntiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpmcUntiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpmcUntiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
