import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ProjectWorkRoutingModule } from './project-work-routing.module';
import { ProjectWorkImplementationLogComponent } from './implementation-log/implementation-log.component';
import { ProjectWorkImplementationLogAddComponent } from './implementation-log/add/add.component';
import { ProjectWorkImplementationLogUpdateComponent } from './implementation-log/update/update.component';
import { ProjectWorkDevelopmentLogComponent } from './development-log/development-log.component';
import { ProjectWorkDevelopmentLogAddComponent } from './development-log/add/add.component';
import { ProjectWorkDevelopmentLogUpdateComponent } from './development-log/update/update.component';
import { ProjectWorkServiceLogComponent } from './service-log/service-log.component';
import { ProjectWorkServiceLogAddComponent } from './service-log/add/add.component';
import { ProjectWorkServiceLogUpdateComponent } from './service-log/update/update.component';
import { ProjectWorkImplementationMilestoneConfirmComponent } from './implementation-milestone-confirm/implementation-milestone-confirm.component';
import { ProjectWorkImplementationMilestoneConfirmAddComponent } from './implementation-milestone-confirm/add/add.component';
import { ProjectWorkImplementationMilestoneConfirmUpdateComponent } from './implementation-milestone-confirm/update/update.component';
import { ProjectWorkDevelopmentMilestoneConfirmComponent } from './development-milestone-confirm/development-milestone-confirm.component';
import { ProjectWorkDevelopmentMilestoneConfirmAddComponent } from './development-milestone-confirm/add/add.component';
import { ProjectWorkDevelopmentMilestoneConfirmUpdateComponent } from './development-milestone-confirm/update/update.component';
import { ProjectWorkServiceMilestoneConfirmComponent } from './service-milestone-confirm/service-milestone-confirm.component';
import { ProjectWorkServiceMilestoneConfirmAddComponent } from './service-milestone-confirm/add/add.component';
import { ProjectWorkServiceMilestoneConfirmUpdateComponent } from './service-milestone-confirm/update/update.component';
import { ProjectWorkImplementationLogViewComponent } from './implementation-log/view/view.component';
import { ProjectWorkDevelopmentLogViewComponent } from './development-log/view/view.component';
import { ProjectWorkServiceLogViewComponent } from './service-log/view/view.component';
import { ProjectWorkImplementationMilestoneConfirmViewComponent } from './implementation-milestone-confirm/view/view.component';
import { ProjectWorkDevelopmentMilestoneConfirmViewComponent } from './development-milestone-confirm/view/view.component';
import { ProjectWorkServiceMilestoneConfirmViewComponent } from './service-milestone-confirm/view/view.component';
import { ProjectWorkProductConfirmationComponent } from './product-confirmation/product-confirmation.component';
import { ProjectWorkProductConfirmationAddComponent } from './product-confirmation/add/add.component';
import { ProjectWorkProductConfirmationUpdateComponent } from './product-confirmation/update/update.component';
import { ProjectWorkProductConfirmationViewComponent } from './product-confirmation/view/view.component';

const COMPONENTS = [
  ProjectWorkImplementationLogComponent,
  ProjectWorkDevelopmentLogComponent,
  ProjectWorkServiceLogComponent,
  ProjectWorkImplementationMilestoneConfirmComponent,
  ProjectWorkDevelopmentMilestoneConfirmComponent,
  ProjectWorkServiceMilestoneConfirmComponent,
  ProjectWorkProductConfirmationComponent,
  ProjectWorkProductConfirmationAddComponent];
const COMPONENTS_NOROUNT = [
  ProjectWorkImplementationLogAddComponent,
  ProjectWorkImplementationLogUpdateComponent,
  ProjectWorkDevelopmentLogAddComponent,
  ProjectWorkDevelopmentLogUpdateComponent,
  ProjectWorkServiceLogAddComponent,
  ProjectWorkServiceLogUpdateComponent,
  ProjectWorkImplementationMilestoneConfirmAddComponent,
  ProjectWorkImplementationMilestoneConfirmUpdateComponent,
  ProjectWorkDevelopmentMilestoneConfirmAddComponent,
  ProjectWorkDevelopmentMilestoneConfirmUpdateComponent,
  ProjectWorkServiceMilestoneConfirmAddComponent,
  ProjectWorkServiceMilestoneConfirmUpdateComponent,
  ProjectWorkImplementationLogViewComponent,
  ProjectWorkDevelopmentLogViewComponent,
  ProjectWorkServiceLogViewComponent,
  ProjectWorkImplementationMilestoneConfirmViewComponent,
  ProjectWorkDevelopmentMilestoneConfirmViewComponent,
  ProjectWorkServiceMilestoneConfirmViewComponent,
  ProjectWorkProductConfirmationUpdateComponent,
  ProjectWorkProductConfirmationViewComponent];

@NgModule({
  imports: [
    SharedModule,
    ProjectWorkRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ProjectWorkModule { }
