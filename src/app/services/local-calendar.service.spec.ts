import { TestBed } from '@angular/core/testing';

import { LocalCalendarService } from './local-calendar.service';

describe('LocalCalendarService', () => {
  let service: LocalCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
