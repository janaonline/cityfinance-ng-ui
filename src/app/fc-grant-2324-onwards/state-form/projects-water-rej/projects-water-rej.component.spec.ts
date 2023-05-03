import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsWaterRejComponent } from './projects-water-rej.component';

describe('ProjectsWaterRejComponent', () => {
  let component: ProjectsWaterRejComponent;
  let fixture: ComponentFixture<ProjectsWaterRejComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsWaterRejComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsWaterRejComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
