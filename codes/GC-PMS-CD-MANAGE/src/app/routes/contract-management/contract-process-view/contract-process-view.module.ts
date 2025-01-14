import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ContractProcessViewRoutingModule } from './contract-process-view-routing.module';
import { ContractProcessViewProcessViewComponent } from './process-view/process-view.component';
import { ContractProcessViewProcessViewCollectionPlanComponent } from './process-view/collection-plan/collection-plan.component';
import { ContractProcessViewProcessViewEssentialInformationComponent } from './process-view/essential-information/essential-information.component';
import { ContractProcessViewProcessViewProductModuleComponent } from './process-view/product-module/product-module.component';

const COMPONENTS = [
  ContractProcessViewProcessViewComponent];
const COMPONENTS_NOROUNT = [
  ContractProcessViewProcessViewCollectionPlanComponent,
  ContractProcessViewProcessViewEssentialInformationComponent,
  ContractProcessViewProcessViewProductModuleComponent];

@NgModule({
  imports: [
    SharedModule,
    ContractProcessViewRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ContractProcessViewModule { }
