import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ReportFormRoutingModule } from './report-form-routing.module';
import { ReportFormProjectStatisticsComponent } from './project-statistics/project-statistics.component';
import { ReportFormProjectSituationComponent } from './project-situation/project-situation.component';

const COMPONENTS = [
  ReportFormProjectStatisticsComponent,
  ReportFormProjectSituationComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ReportFormRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ReportFormModule { }
