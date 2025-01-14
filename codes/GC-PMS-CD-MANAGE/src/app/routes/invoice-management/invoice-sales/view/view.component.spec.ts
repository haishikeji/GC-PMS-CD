import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceManagementInvoiceSalesViewComponent } from './view.component';

describe('InvoiceManagementInvoiceSalesViewComponent', () => {
  let component: InvoiceManagementInvoiceSalesViewComponent;
  let fixture: ComponentFixture<InvoiceManagementInvoiceSalesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManagementInvoiceSalesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManagementInvoiceSalesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
