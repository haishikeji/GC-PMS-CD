import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceManagementInvoiceSalesUpdateComponent } from './update.component';

describe('InvoiceManagementInvoiceSalesUpdateComponent', () => {
  let component: InvoiceManagementInvoiceSalesUpdateComponent;
  let fixture: ComponentFixture<InvoiceManagementInvoiceSalesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManagementInvoiceSalesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManagementInvoiceSalesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
