import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceManagementInvoiceManagePurchaseComponent } from './invoice-manage-purchase.component';

describe('InvoiceManagementInvoiceManagePurchaseComponent', () => {
  let component: InvoiceManagementInvoiceManagePurchaseComponent;
  let fixture: ComponentFixture<InvoiceManagementInvoiceManagePurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManagementInvoiceManagePurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManagementInvoiceManagePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
