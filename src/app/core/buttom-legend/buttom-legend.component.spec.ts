import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtomLegendComponent } from './buttom-legend.component';

describe('ButtomLegendComponent', () => {
  let component: ButtomLegendComponent;
  let fixture: ComponentFixture<ButtomLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtomLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtomLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
