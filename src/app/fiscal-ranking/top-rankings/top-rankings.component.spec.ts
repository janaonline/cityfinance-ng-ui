import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRankingsComponent } from './top-rankings.component';

describe('TopRankingsComponent', () => {
  let component: TopRankingsComponent;
  let fixture: ComponentFixture<TopRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRankingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
