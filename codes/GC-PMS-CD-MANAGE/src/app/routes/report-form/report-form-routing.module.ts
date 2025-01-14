import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportFormProjectStatisticsComponent } from './project-statistics/project-statistics.component';
import { ReportFormProjectSituationComponent } from './project-situation/project-situation.component';

const routes: Routes = [

  { path: 'project-statistics', component: ReportFormProjectStatisticsComponent },
  { path: 'project-situation', component: ReportFormProjectSituationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportFormRoutingModule { }
