import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ContractManagementRoutingModule } from './contract-management-routing.module';
import { ContractManagementContractFileComponent } from './contract-file/contract-file.component';
import { ContractManagementContractFileAddComponent } from './contract-file/add/add.component';
import { ContractManagementContractFileAddEssentialInformationComponent } from './contract-file/add/essential-information/essential-information.component';
import { ContractManagementContractFileAddProductModuleComponent } from './contract-file/add/product-module/product-module.component';
import { ContractManagementContractFileAddCollectionPlanComponent } from './contract-file/add/collection-plan/collection-plan.component';
import { ContractManagementContractFileUpdateComponent } from './contract-file/update/update.component';
import { ContractManagementContractFileUpdateCollectionPlanComponent } from './contract-file/update/collection-plan/collection-plan.component';
import { ContractManagementContractFileUpdateEssentialInformationComponent } from './contract-file/update/essential-information/essential-information.component';
import { ContractManagementContractFileUpdateProductModuleComponent } from './contract-file/update/product-module/product-module.component';

const COMPONENTS = [
  ContractManagementContractFileComponent];
const COMPONENTS_NOROUNT = [
  ContractManagementContractFileAddComponent,
  ContractManagementContractFileAddEssentialInformationComponent,
  ContractManagementContractFileAddProductModuleComponent,
  ContractManagementContractFileAddCollectionPlanComponent,
  ContractManagementContractFileUpdateComponent,
  ContractManagementContractFileUpdateCollectionPlanComponent,
  ContractManagementContractFileUpdateEssentialInformationComponent,
  ContractManagementContractFileUpdateProductModuleComponent];

@NgModule({
  imports: [
    SharedModule,
    ContractManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ContractManagementModule { }
