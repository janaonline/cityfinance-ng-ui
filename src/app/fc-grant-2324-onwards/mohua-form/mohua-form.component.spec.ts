import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MohuaFormComponent } from './mohua-form.component';

describe('MohuaFormComponent', () => {
  let component: MohuaFormComponent;
  let fixture: ComponentFixture<MohuaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MohuaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MohuaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
