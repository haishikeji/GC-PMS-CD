import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { InvoiceManagementRoutingModule } from './invoice-management-routing.module';
import { InvoiceManagementInvoiceManagePurchaseComponent } from './invoice-manage-purchase/invoice-manage-purchase.component';
import { InvoiceManagementInvoiceManagePurchaseAddComponent } from './invoice-manage-purchase/add/add.component';
import { InvoiceManagementInvoiceManagePurchaseUpdateComponent } from './invoice-manage-purchase/update/update.component';
import { InvoiceManagementInvoiceSalesComponent } from './invoice-sales/invoice-sales.component';
import { InvoiceManagementInvoiceSalesAddComponent } from './invoice-sales/add/add.component';
import { InvoiceManagementInvoiceSalesUpdateComponent } from './invoice-sales/update/update.component';
import { InvoiceManagementInvoiceManagePurchaseViewComponent } from './invoice-manage-purchase/view/view.component';
import { InvoiceManagementInvoiceSalesViewComponent } from './invoice-sales/view/view.component';

const COMPONENTS = [
  InvoiceManagementInvoiceManagePurchaseComponent,
  InvoiceManagementInvoiceSalesComponent];
const COMPONENTS_NOROUNT = [
  InvoiceManagementInvoiceManagePurchaseAddComponent,
  InvoiceManagementInvoiceManagePurchaseUpdateComponent,
  InvoiceManagementInvoiceSalesAddComponent,
  InvoiceManagementInvoiceSalesUpdateComponent,
  InvoiceManagementInvoiceManagePurchaseViewComponent,
  InvoiceManagementInvoiceSalesViewComponent];

@NgModule({
  imports: [
    SharedModule,
    InvoiceManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class InvoiceManagementModule { }
