import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomaticLogonListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: AutomaticLogonListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomaticLogonRoutingModule { }
