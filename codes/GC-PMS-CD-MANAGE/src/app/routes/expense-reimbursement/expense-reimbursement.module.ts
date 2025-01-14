import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ExpenseReimbursementRoutingModule } from './expense-reimbursement-routing.module';
import { ExpenseReimbursementExpenseReimbursementFormComponent } from './expense-reimbursement-form/expense-reimbursement-form.component';
import { ExpenseReimbursementExpenseReimbursementFormAddComponent } from './expense-reimbursement-form/add/add.component';
import { ExpenseReimbursementExpenseReimbursementFormUpdateComponent } from './expense-reimbursement-form/update/update.component';
import { ExpenseReimbursementExpenseReimbursementFormViewComponent } from './expense-reimbursement-form/view/view.component';

const COMPONENTS = [
  ExpenseReimbursementExpenseReimbursementFormComponent];
const COMPONENTS_NOROUNT = [
  ExpenseReimbursementExpenseReimbursementFormAddComponent,
  ExpenseReimbursementExpenseReimbursementFormUpdateComponent,
  ExpenseReimbursementExpenseReimbursementFormViewComponent];

@NgModule({
  imports: [
    SharedModule,
    ExpenseReimbursementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ExpenseReimbursementModule { }
