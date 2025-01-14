import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractManagementContractFileComponent } from './contract-file/contract-file.component';

const routes: Routes = [

  { path: 'contract-file', component: ContractManagementContractFileComponent },
  { path: 'contract-process-view', loadChildren: './contract-process-view/contract-process-view.module#ContractProcessViewModule' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractManagementRoutingModule { }
