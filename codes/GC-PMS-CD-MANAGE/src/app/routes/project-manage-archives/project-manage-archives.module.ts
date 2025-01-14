import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ProjectManageArchivesRoutingModule } from './project-manage-archives-routing.module';
import { ProjectManageArchivesListComponent } from './list/list.component';
import { ProjectManageArchivesAddComponent } from './add/add.component';
import { ProjectManageArchivesAddEssentialInformationComponent } from './add/essential-information/essential-information.component';
import { ProjectManageArchivesAddBusinessAffairsComponent } from './add/business-affairs/business-affairs.component';
import { ProjectManageArchivesAddImplementationComponent } from './add/implementation/implementation.component';
import { ProjectManageArchivesAddDevelopmentComponent } from './add/development/development.component';
import { ProjectManageArchivesAddServicetaComponent } from './add/serviceta/serviceta.component';
import { ProjectManageArchivesUpdateComponent } from './update/update.component';
import { ProjectManageArchivesUpdateBusinessAffairsComponent } from './update/business-affairs/business-affairs.component';
import { ProjectManageArchivesUpdateDevelopmentComponent } from './update/development/development.component';
import { ProjectManageArchivesUpdateEssentialInformationComponent } from './update/essential-information/essential-information.component';
import { ProjectManageArchivesUpdateImplementationComponent } from './update/implementation/implementation.component';
import { ProjectManageArchivesUpdateServicetaComponent } from './update/serviceta/serviceta.component';
import { ProjectManageArchivesViewComponent } from './view/view.component';
import { ProjectManageArchivesViewEssentialInformationComponent } from './view/essential-information/essential-information.component';
import { ProjectManageArchivesViewBusinessAffairsComponent } from './view/business-affairs/business-affairs.component';
import { ProjectManageArchivesViewImplementationComponent } from './view/implementation/implementation.component';
import { ProjectManageArchivesViewDevelopmentComponent } from './view/development/development.component';
import { ProjectManageArchivesViewServicetaComponent } from './view/serviceta/serviceta.component';

const COMPONENTS = [
  ProjectManageArchivesListComponent
  ,
  ProjectManageArchivesUpdateComponent];
const COMPONENTS_NOROUNT = [
  ProjectManageArchivesAddComponent,
  ProjectManageArchivesAddEssentialInformationComponent,
  ProjectManageArchivesAddBusinessAffairsComponent,
  ProjectManageArchivesAddImplementationComponent,
  ProjectManageArchivesAddDevelopmentComponent,
  ProjectManageArchivesAddServicetaComponent,
  ProjectManageArchivesUpdateBusinessAffairsComponent,
  ProjectManageArchivesUpdateDevelopmentComponent,
  ProjectManageArchivesUpdateEssentialInformationComponent,
  ProjectManageArchivesUpdateImplementationComponent,
  ProjectManageArchivesUpdateServicetaComponent,
  ProjectManageArchivesViewComponent,
  ProjectManageArchivesViewEssentialInformationComponent,
  ProjectManageArchivesViewBusinessAffairsComponent,
  ProjectManageArchivesViewImplementationComponent,
  ProjectManageArchivesViewDevelopmentComponent,
  ProjectManageArchivesViewServicetaComponent];

@NgModule({
  imports: [
    SharedModule,
    ProjectManageArchivesRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ProjectManageArchivesModule { }
