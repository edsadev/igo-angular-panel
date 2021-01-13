import { TestBed } from '@angular/core/testing';

import { PaymentezService } from './paymentez.service';

describe('PaymentezService', () => {
  let service: PaymentezService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentezService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
