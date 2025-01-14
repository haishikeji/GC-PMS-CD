import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceManagementInvoiceManagePurchaseAddComponent } from './add.component';

describe('InvoiceManagementInvoiceManagePurchaseAddComponent', () => {
  let component: InvoiceManagementInvoiceManagePurchaseAddComponent;
  let fixture: ComponentFixture<InvoiceManagementInvoiceManagePurchaseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManagementInvoiceManagePurchaseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManagementInvoiceManagePurchaseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
