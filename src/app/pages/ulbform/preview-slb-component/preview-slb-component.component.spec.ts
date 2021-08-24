import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSlbComponentComponent } from './preview-slb-component.component';

describe('PreviewSlbComponentComponent', () => {
  let component: PreviewSlbComponentComponent;
  let fixture: ComponentFixture<PreviewSlbComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewSlbComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSlbComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
