import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalFilterComponent } from './historical-filter.component';

describe('HistoricalFilterComponent', () => {
  let component: HistoricalFilterComponent;
  let fixture: ComponentFixture<HistoricalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
