import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DownPaymentManagementReceiptViewComponent } from './view.component';

describe('DownPaymentManagementReceiptViewComponent', () => {
  let component: DownPaymentManagementReceiptViewComponent;
  let fixture: ComponentFixture<DownPaymentManagementReceiptViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownPaymentManagementReceiptViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownPaymentManagementReceiptViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
