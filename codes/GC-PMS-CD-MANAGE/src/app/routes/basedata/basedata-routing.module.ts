import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasedataMaterialComponent } from './material/material.component';
import { BasedataCustomerComponent } from './customer/customer.component';
import { BasedataCustomerCustomerAddComponent } from './customer/customer-add/customer-add.component';
import { BasedataCustomerEditComponent } from './customer/edit/edit.component';
import { BasedataCustomerDetailsComponent } from './customer/details/details.component';
import { BasedataPostComponent } from './post/post.component';
import { BasedataProjectApprovalComponent } from './project-approval/project-approval.component';
import { BasedataBaseArchivesMilestoneComponent } from './base-archives-milestone/base-archives-milestone.component';
import { BasedataBaseArchivesCollectionLineComponent } from './base-archives-collection-line/base-archives-collection-line.component';
import { BasedataBaseArchivesCostComponent } from './base-archives-cost/base-archives-cost.component';
import { BasedataMilestoneCategoryComponent } from './milestone-category/milestone-category.component';
import { BasedataTestComponent } from './test/test.component';
import { TestAddComponent } from './test/add/add.component';
import { BasedataCustomerClassificationComponent } from './customer-classification/customer-classification.component';
import { BasedataInformationSourcesComponent } from './information-sources/information-sources.component';
import { BasedataBusinessRelationsComponent } from './business-relations/business-relations.component';
import { BasedataCustomerGroupingComponent } from './customer-grouping/customer-grouping.component';
import { BasedataSleepTypeComponent } from './sleep-type/sleep-type.component';
import { BasedataUnitSizeComponent } from './unit-size/unit-size.component';
import { BasedataCustomerRelationshipComponent } from './customer-relationship/customer-relationship.component';
import { BasedataValueLevelComponent } from './value-level/value-level.component';
import { BasedataMerchantsIndustryComponent } from './merchants-industry/merchants-industry.component';
import { BasedataMerchantsIndustryAddComponent } from './merchants-industry/add/add.component';
import { BasedataPersonnelSizeComponent } from './personnel-size/personnel-size.component';
import { BasedataRegisteredCapitalComponent } from './registered-capital/registered-capital.component';
import { BasedataSalesStatusComponent } from './sales-status/sales-status.component';
import { BasedataSalesStatusAddComponent } from './sales-status/add/add.component';
import { BasedataCustomerModalTableComponent } from './customer/modal-table/modal-table.component';
import { BasedataMaterialFileComponent } from './material-file/material-file.component';
import { BasedataMaterialFileAddComponent } from './material-file/add/add.component';
import { BasedataMaterialFileProductAddComponent } from './material-file/product-add/product-add.component';
import { BasedataMaterialFileDetailsComponent } from './material-file/details/details.component';

const routes: Routes = [
  { path: 'customer', component: BasedataCustomerComponent },
  { path: 'customerAdd', component: BasedataCustomerCustomerAddComponent },
  { path: 'material', component: BasedataMaterialComponent },
  { path: 'details', component: BasedataCustomerDetailsComponent },
  { path: 'post', component: BasedataPostComponent },
  { path: 'project-approval', component: BasedataProjectApprovalComponent },
  { path: 'base-archives-milestone', component: BasedataBaseArchivesMilestoneComponent },
  { path: 'base-archives-collection-line', component: BasedataBaseArchivesCollectionLineComponent },
  { path: 'base-archives-cost', component: BasedataBaseArchivesCostComponent },
  { path: 'milestone-category', component: BasedataMilestoneCategoryComponent },
  { path: 'test', component: BasedataTestComponent },
  { path: 'test/add', component: TestAddComponent },
  { path: 'customer-classification', component: BasedataCustomerClassificationComponent },
  { path: 'information-sources', component: BasedataInformationSourcesComponent },
  { path: 'business-relations', component: BasedataBusinessRelationsComponent },
  { path: 'customer-grouping', component: BasedataCustomerGroupingComponent },
  { path: 'sleep-type', component: BasedataSleepTypeComponent },
  { path: 'unit-size', component: BasedataUnitSizeComponent },
  { path: 'customer-relationship', component: BasedataCustomerRelationshipComponent },
  { path: 'value-level', component: BasedataValueLevelComponent },
  { path: 'merchants-industry', component: BasedataMerchantsIndustryComponent },
  { path: 'add', component: BasedataMerchantsIndustryAddComponent },
  { path: 'personnel-size', component: BasedataPersonnelSizeComponent },
  { path: 'registered-capital', component: BasedataRegisteredCapitalComponent },
  { path: 'sales-status', component: BasedataSalesStatusComponent },
  { path: 'add', component: BasedataSalesStatusAddComponent },
  { path: 'modalTable', component: BasedataCustomerModalTableComponent },
  { path: 'material-file', component: BasedataMaterialFileComponent },
  { path: 'add', component: BasedataMaterialFileAddComponent },
  { path: 'productAdd', component: BasedataMaterialFileProductAddComponent },
  { path: 'details', component: BasedataMaterialFileDetailsComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasedataRoutingModule {}
