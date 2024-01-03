import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanReformsIvComponent } from './urban-reforms-iv.component';

describe('UrbanReformsIvComponent', () => {
  let component: UrbanReformsIvComponent;
  let fixture: ComponentFixture<UrbanReformsIvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrbanReformsIvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrbanReformsIvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
