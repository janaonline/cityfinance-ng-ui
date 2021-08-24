import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtiNewPreComponent } from './uti-new-pre.component';

describe('UtiNewPreComponent', () => {
  let component: UtiNewPreComponent;
  let fixture: ComponentFixture<UtiNewPreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtiNewPreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtiNewPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
