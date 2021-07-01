import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MohuaDashboardComponent } from './mohua-dashboard.component';

describe('MohuaDashboardComponent', () => {
  let component: MohuaDashboardComponent;
  let fixture: ComponentFixture<MohuaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MohuaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MohuaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
