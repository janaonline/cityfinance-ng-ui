import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAvailableComponent } from './data-available.component';

describe('DataAvailableComponent', () => {
  let component: DataAvailableComponent;
  let fixture: ComponentFixture<DataAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAvailableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
