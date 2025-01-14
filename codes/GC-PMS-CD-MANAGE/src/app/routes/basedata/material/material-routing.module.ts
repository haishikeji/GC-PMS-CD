import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasedataMaterialComponent } from './material.component';

const routes: Routes = [
  {path:'',component:BasedataMaterialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
