import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsWssComponent } from './projects-wss.component';

describe('ProjectsWssComponent', () => {
  let component: ProjectsWssComponent;
  let fixture: ComponentFixture<ProjectsWssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsWssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsWssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
