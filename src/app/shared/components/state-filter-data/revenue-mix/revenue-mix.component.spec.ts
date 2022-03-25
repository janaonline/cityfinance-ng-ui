import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueMixComponent } from './revenue-mix.component';

describe('RevenueMixComponent', () => {
  let component: RevenueMixComponent;
  let fixture: ComponentFixture<RevenueMixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueMixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
