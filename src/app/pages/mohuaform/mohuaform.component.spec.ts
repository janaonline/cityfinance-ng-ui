import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MohuaformComponent } from './mohuaform.component';

describe('MohuaformComponent', () => {
  let component: MohuaformComponent;
  let fixture: ComponentFixture<MohuaformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MohuaformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MohuaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
