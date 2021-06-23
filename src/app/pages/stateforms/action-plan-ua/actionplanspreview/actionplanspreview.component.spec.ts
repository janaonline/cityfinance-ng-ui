import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionplanspreviewComponent } from './actionplanspreview.component';

describe('ActionplanspreviewComponent', () => {
  let component: ActionplanspreviewComponent;
  let fixture: ComponentFixture<ActionplanspreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionplanspreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionplanspreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
