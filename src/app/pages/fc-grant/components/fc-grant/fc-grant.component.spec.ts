import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FcGrantComponent } from './fc-grant.component';

describe('FcGrantComponent', () => {
  let component: FcGrantComponent;
  let fixture: ComponentFixture<FcGrantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FcGrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
