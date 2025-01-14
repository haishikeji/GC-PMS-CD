import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceManagementInvoiceManagePurchaseComponent } from './invoice-manage-purchase/invoice-manage-purchase.component';
import { InvoiceManagementInvoiceSalesComponent } from './invoice-sales/invoice-sales.component';

const routes: Routes = [

  { path: 'invoice-manage-purchase', component: InvoiceManagementInvoiceManagePurchaseComponent },
  { path: 'invoice-sales', component: InvoiceManagementInvoiceSalesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceManagementRoutingModule { }
