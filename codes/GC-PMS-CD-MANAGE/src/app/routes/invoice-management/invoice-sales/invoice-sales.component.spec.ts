import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceManagementInvoiceSalesComponent } from './invoice-sales.component';

describe('InvoiceManagementInvoiceSalesComponent', () => {
  let component: InvoiceManagementInvoiceSalesComponent;
  let fixture: ComponentFixture<InvoiceManagementInvoiceSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManagementInvoiceSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManagementInvoiceSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
