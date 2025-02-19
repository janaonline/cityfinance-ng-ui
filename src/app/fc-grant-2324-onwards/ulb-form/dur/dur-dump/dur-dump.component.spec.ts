import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurDumpComponent } from './dur-dump.component';

describe('DurDumpComponent', () => {
  let component: DurDumpComponent;
  let fixture: ComponentFixture<DurDumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurDumpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DurDumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
