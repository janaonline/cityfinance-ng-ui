import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionMinistorComponent } from './union-ministor.component';

describe('UnionMinistorComponent', () => {
  let component: UnionMinistorComponent;
  let fixture: ComponentFixture<UnionMinistorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnionMinistorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnionMinistorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
