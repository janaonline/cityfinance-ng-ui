import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorePerComponent } from './score-per.component';

describe('ScorePerComponent', () => {
  let component: ScorePerComponent;
  let fixture: ComponentFixture<ScorePerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorePerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorePerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
