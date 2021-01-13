import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentezComponent } from './paymentez.component';

describe('PaymentezComponent', () => {
  let component: PaymentezComponent;
  let fixture: ComponentFixture<PaymentezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
