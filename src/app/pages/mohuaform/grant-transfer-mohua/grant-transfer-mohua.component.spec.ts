import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantTransferMohuaComponent } from './grant-transfer-mohua.component';

describe('GrantTransferMohuaComponent', () => {
  let component: GrantTransferMohuaComponent;
  let fixture: ComponentFixture<GrantTransferMohuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantTransferMohuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantTransferMohuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
