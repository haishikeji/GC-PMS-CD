import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseReimbursementExpenseReimbursementFormComponent } from './expense-reimbursement-form/expense-reimbursement-form.component';

const routes: Routes = [

  { path: 'expense-reimbursement-form', component: ExpenseReimbursementExpenseReimbursementFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseReimbursementRoutingModule { }
