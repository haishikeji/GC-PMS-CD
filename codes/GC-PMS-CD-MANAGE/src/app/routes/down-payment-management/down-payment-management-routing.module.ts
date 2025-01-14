import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownPaymentManagementReceiptComponent } from './receipt/receipt.component';
import { DownPaymentManagementPaymentSlipComponent } from './payment-slip/payment-slip.component';
import { DownPaymentManagementCollectionConfirmationComponent } from './collection-confirmation/collection-confirmation.component';

const routes: Routes = [

  { path: 'receipt', component: DownPaymentManagementReceiptComponent },
  { path: 'payment-slip', component: DownPaymentManagementPaymentSlipComponent },
  { path: 'collection-confirmation', component: DownPaymentManagementCollectionConfirmationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownPaymentManagementRoutingModule { }
