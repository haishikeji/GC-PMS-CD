import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceManagementInvoiceSalesAddComponent } from './add.component';

describe('InvoiceManagementInvoiceSalesAddComponent', () => {
  let component: InvoiceManagementInvoiceSalesAddComponent;
  let fixture: ComponentFixture<InvoiceManagementInvoiceSalesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManagementInvoiceSalesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManagementInvoiceSalesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
