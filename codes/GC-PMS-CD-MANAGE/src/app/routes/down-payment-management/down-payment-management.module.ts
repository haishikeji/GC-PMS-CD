import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DownPaymentManagementRoutingModule } from './down-payment-management-routing.module';
import { DownPaymentManagementReceiptComponent } from './receipt/receipt.component';
import { DownPaymentManagementReceiptAddComponent } from './receipt/add/add.component';
import { DownPaymentManagementReceiptUpdateComponent } from './receipt/update/update.component';
import { DownPaymentManagementPaymentSlipComponent } from './payment-slip/payment-slip.component';
import { DownPaymentManagementPaymentSlipAddComponent } from './payment-slip/add/add.component';
import { DownPaymentManagementPaymentSlipUpdateComponent } from './payment-slip/update/update.component';
import { DownPaymentManagementReceiptViewComponent } from './receipt/view/view.component';
import { DownPaymentManagementPaymentSlipViewComponent } from './payment-slip/view/view.component';
import { DownPaymentManagementCollectionConfirmationComponent } from './collection-confirmation/collection-confirmation.component';

const COMPONENTS = [
  DownPaymentManagementReceiptComponent,
  DownPaymentManagementPaymentSlipComponent,
  DownPaymentManagementCollectionConfirmationComponent];
const COMPONENTS_NOROUNT = [
  DownPaymentManagementReceiptAddComponent,
  DownPaymentManagementReceiptUpdateComponent,
  DownPaymentManagementPaymentSlipAddComponent,
  DownPaymentManagementPaymentSlipUpdateComponent,
  DownPaymentManagementReceiptViewComponent,
  DownPaymentManagementPaymentSlipViewComponent];

@NgModule({
  imports: [
    SharedModule,
    DownPaymentManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class DownPaymentManagementModule { }
