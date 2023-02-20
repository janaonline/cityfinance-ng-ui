import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurTemplateComponent } from './dur-template.component';

describe('DurTemplateComponent', () => {
  let component: DurTemplateComponent;
  let fixture: ComponentFixture<DurTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
