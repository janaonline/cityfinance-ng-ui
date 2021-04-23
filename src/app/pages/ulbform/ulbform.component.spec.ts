import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbformComponent } from './ulbform.component';

describe('UlbformComponent', () => {
  let component: UlbformComponent;
  let fixture: ComponentFixture<UlbformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
