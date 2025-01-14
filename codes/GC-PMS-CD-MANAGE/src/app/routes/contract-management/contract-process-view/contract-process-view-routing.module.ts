import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractProcessViewProcessViewComponent } from './process-view/process-view.component';

const routes: Routes = [

  { path: 'process-view', component: ContractProcessViewProcessViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractProcessViewRoutingModule { }
