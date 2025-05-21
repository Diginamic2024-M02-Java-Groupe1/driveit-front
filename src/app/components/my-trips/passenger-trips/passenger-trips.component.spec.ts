import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerTripsComponent } from './passenger-trips.component';

describe('PassengerTripsComponent', () => {
  let component: PassengerTripsComponent;
  let fixture: ComponentFixture<PassengerTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerTripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
