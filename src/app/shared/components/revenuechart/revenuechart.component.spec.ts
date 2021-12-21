import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RevenuechartComponent } from "./revenuechart.component";

describe("RevenuechartComponent", () => {
  let component: RevenuechartComponent;
  let fixture: ComponentFixture<RevenuechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevenuechartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
