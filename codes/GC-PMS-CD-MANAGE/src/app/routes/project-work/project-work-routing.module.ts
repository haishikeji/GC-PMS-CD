import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectWorkImplementationLogComponent } from './implementation-log/implementation-log.component';
import { ProjectWorkDevelopmentLogComponent } from './development-log/development-log.component';
import { ProjectWorkServiceLogComponent } from './service-log/service-log.component';
import { ProjectWorkImplementationMilestoneConfirmComponent } from './implementation-milestone-confirm/implementation-milestone-confirm.component';
import { ProjectWorkDevelopmentMilestoneConfirmComponent } from './development-milestone-confirm/development-milestone-confirm.component';
import { ProjectWorkServiceMilestoneConfirmComponent } from './service-milestone-confirm/service-milestone-confirm.component';
import { ProjectWorkProductConfirmationComponent } from './product-confirmation/product-confirmation.component';
import { ProjectWorkProductConfirmationAddComponent } from './product-confirmation/add/add.component';

const routes: Routes = [

  { path: 'implementation-log', component: ProjectWorkImplementationLogComponent },
  { path: 'development-log', component: ProjectWorkDevelopmentLogComponent },
  { path: 'service-log', component: ProjectWorkServiceLogComponent },
  { path: 'implementation-milestone-confirm', component: ProjectWorkImplementationMilestoneConfirmComponent },
  { path: 'development-milestone-confirm', component: ProjectWorkDevelopmentMilestoneConfirmComponent },
  { path: 'service-milestone-confirm', component: ProjectWorkServiceMilestoneConfirmComponent },
  { path: 'product-confirmation', component: ProjectWorkProductConfirmationComponent },
  { path: 'add', component: ProjectWorkProductConfirmationAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectWorkRoutingModule { }
