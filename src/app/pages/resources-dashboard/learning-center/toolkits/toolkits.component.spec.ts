import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolkitsComponent } from './toolkits.component';

describe('ToolkitsComponent', () => {
  let component: ToolkitsComponent;
  let fixture: ComponentFixture<ToolkitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolkitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolkitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
