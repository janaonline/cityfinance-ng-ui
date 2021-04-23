import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantTraCertiComponent } from './grant-tra-certi.component';

describe('GrantTraCertiComponent', () => {
  let component: GrantTraCertiComponent;
  let fixture: ComponentFixture<GrantTraCertiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantTraCertiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantTraCertiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
