import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DownPaymentManagementReceiptComponent } from './receipt.component';

describe('DownPaymentManagementReceiptComponent', () => {
  let component: DownPaymentManagementReceiptComponent;
  let fixture: ComponentFixture<DownPaymentManagementReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownPaymentManagementReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownPaymentManagementReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
