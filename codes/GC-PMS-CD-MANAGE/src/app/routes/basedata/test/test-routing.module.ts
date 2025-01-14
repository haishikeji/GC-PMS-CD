import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestAddComponent } from './add/add.component';

const routes: Routes = [{
  path:'add',component:TestAddComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
