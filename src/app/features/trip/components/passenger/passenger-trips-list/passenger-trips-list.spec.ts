import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerTripsList } from './passenger-trips-list';

describe('PassengerTripsList', () => {
  let component: PassengerTripsList;
  let fixture: ComponentFixture<PassengerTripsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerTripsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerTripsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
