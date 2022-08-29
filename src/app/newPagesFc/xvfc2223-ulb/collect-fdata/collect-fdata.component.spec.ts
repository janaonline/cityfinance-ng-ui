import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectFdataComponent } from './collect-fdata.component';

describe('CollectFdataComponent', () => {
  let component: CollectFdataComponent;
  let fixture: ComponentFixture<CollectFdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectFdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectFdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
