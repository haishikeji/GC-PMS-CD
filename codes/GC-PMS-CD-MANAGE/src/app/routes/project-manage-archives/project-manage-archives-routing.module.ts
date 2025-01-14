import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectManageArchivesListComponent } from './list/list.component';
import { ProjectManageArchivesUpdateComponent } from './update/update.component';

const routes: Routes = [

  { path: 'list', component: ProjectManageArchivesListComponent },
  { path: 'update', component: ProjectManageArchivesUpdateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManageArchivesRoutingModule { }
