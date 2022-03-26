import { TestBed } from '@angular/core/testing';

import { RentpaymentService } from './rentpayment.service';

describe('RentpaymentService', () => {
  let service: RentpaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentpaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
