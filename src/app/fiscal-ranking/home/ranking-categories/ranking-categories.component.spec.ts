import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingCategoriesComponent } from './ranking-categories.component';

describe('RankingCategoriesComponent', () => {
  let component: RankingCategoriesComponent;
  let fixture: ComponentFixture<RankingCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
