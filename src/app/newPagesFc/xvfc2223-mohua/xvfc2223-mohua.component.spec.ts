import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Xvfc2223MohuaComponent } from './xvfc2223-mohua.component';

describe('Xvfc2223MohuaComponent', () => {
  let component: Xvfc2223MohuaComponent;
  let fixture: ComponentFixture<Xvfc2223MohuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Xvfc2223MohuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Xvfc2223MohuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
