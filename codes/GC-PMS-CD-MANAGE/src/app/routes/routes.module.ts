import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';
import { CallbackComponent } from './callback/callback.component';
import { BasedataModule } from './basedata/basedata.module';
import { RoutesUploadDownloadComponent } from './upload-download/upload-download.component';
import { RoutesSharedModalCustomerSelectComponent } from './shared/modal/customer-select/customer-select.component';
import { RoutesSharedModalProdutSelectComponent } from './shared/modal/produt-select/produt-select.component';
import { ContractProcessViewProcessViewComponent } from './contract-management/contract-process-view/process-view/process-view.component';
import { AutomaticLogonListComponent } from './automatic-logon/list/list.component';
import { ContractProcessViewProcessViewCollectionPlanComponent } from './contract-management/contract-process-view/process-view/collection-plan/collection-plan.component';
import { ContractProcessViewProcessViewEssentialInformationComponent } from './contract-management/contract-process-view/process-view/essential-information/essential-information.component';
import { ContractProcessViewProcessViewProductModuleComponent } from './contract-management/contract-process-view/process-view/product-module/product-module.component';
// import { PmModule } from './pm/pm.module';
// import { RoutesCommonUploadUrlAddComponent } from './common/upload-url-add/upload-url-add.component';
// import { RoutesMessageNotificationComponent } from './message-notification/message-notification.component';
// import { RoutesCommonSelectContractCodeComponent } from './common/select-contract-code/select-contract-code.component';
// import { FinancialManagementModule } from './financial-management/financial-management.module';



const COMPONENTS = [
  DashboardV1Component,
  DashboardAnalysisComponent,
  DashboardMonitorComponent,
  DashboardWorkplaceComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  UserLockComponent,
  CallbackComponent,
  ContractProcessViewProcessViewComponent,
  AutomaticLogonListComponent
];
const COMPONENTS_NOROUNT = [
  // RoutesCommonUploadUrlAddComponent,
  // RoutesMessageNotificationComponent,
  // RoutesCommonSelectContractCodeComponent

  RoutesUploadDownloadComponent
  ,
  RoutesSharedModalCustomerSelectComponent,
  RoutesSharedModalProdutSelectComponent];

const external_page=[
  ContractProcessViewProcessViewCollectionPlanComponent,
  ContractProcessViewProcessViewEssentialInformationComponent,
  ContractProcessViewProcessViewProductModuleComponent
]

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...external_page,...COMPONENTS, ...COMPONENTS_NOROUNT,],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule { }
