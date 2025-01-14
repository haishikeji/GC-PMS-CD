import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BasedataRoutingModule } from './basedata-routing.module';

import { BasedataMaterialComponent } from './material/material.component';

import { BasedataCustomerComponent } from './customer/customer.component';
import { BasedataCustomerCustomerAddComponent } from './customer/customer-add/customer-add.component';
import { BasedataCustomerEditComponent } from './customer/edit/edit.component';
import { BasedataCustomerDetailsComponent } from './customer/details/details.component';
import { BasedataCustomerIsAbbreviationComponent } from './customer/is-abbreviation/is-abbreviation.component';
import { BasedataPostComponent } from './post/post.component';
import { BasedataPostAddComponent } from './post/add/add.component';
import { BasedataProjectApprovalComponent } from './project-approval/project-approval.component';
import { BasedataProjectApprovalAddComponent } from './project-approval/add/add.component';
import { BasedataBaseArchivesMilestoneComponent } from './base-archives-milestone/base-archives-milestone.component';
import { BasedataBaseArchivesMilestoneAddComponent } from './base-archives-milestone/add/add.component';
import { BasedataBaseArchivesCollectionLineComponent } from './base-archives-collection-line/base-archives-collection-line.component';
import { BasedataBaseArchivesCollectionLineAddComponent } from './base-archives-collection-line/add/add.component';
import { BasedataBaseArchivesCostComponent } from './base-archives-cost/base-archives-cost.component';
import { BasedataBaseArchivesCostAddComponent } from './base-archives-cost/add/add.component';
import { BasedataMilestoneCategoryComponent } from './milestone-category/milestone-category.component';
import { BasedataMilestoneCategoryEditComponent } from './milestone-category/edit/edit.component';
import { BasedataBaseArchivesCollectionLineViewComponent } from './base-archives-collection-line/view/view.component';
import { BasedataBaseArchivesCostViewComponent } from './base-archives-cost/view/view.component';
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

const COMPONENTS = [
  BasedataCustomerComponent,
  BasedataCustomerCustomerAddComponent,
  BasedataMaterialComponent,
  BasedataCustomerDetailsComponent,
  BasedataPostComponent,
  BasedataProjectApprovalComponent,
  BasedataBaseArchivesMilestoneComponent,
  BasedataBaseArchivesCollectionLineComponent,
  BasedataBaseArchivesCostComponent,
  BasedataMilestoneCategoryComponent,
  BasedataTestComponent,
  TestAddComponent,
  BasedataCustomerClassificationComponent,
  BasedataInformationSourcesComponent,
  BasedataBusinessRelationsComponent,
  BasedataCustomerGroupingComponent,
  BasedataSleepTypeComponent,
  BasedataUnitSizeComponent,
  BasedataCustomerRelationshipComponent,
  BasedataValueLevelComponent,
  BasedataMerchantsIndustryComponent,
  BasedataMerchantsIndustryAddComponent,
  BasedataPersonnelSizeComponent,
  BasedataRegisteredCapitalComponent,
  BasedataSalesStatusComponent,
  BasedataSalesStatusAddComponent,
  BasedataCustomerModalTableComponent,
  BasedataMaterialFileComponent,
  BasedataMaterialFileAddComponent,
  BasedataMaterialFileProductAddComponent,
  BasedataMaterialFileDetailsComponent,
];
const COMPONENTS_NOROUNT = [
  BasedataCustomerEditComponent,
  BasedataCustomerIsAbbreviationComponent,
  BasedataPostAddComponent,
  BasedataProjectApprovalAddComponent,
  BasedataBaseArchivesMilestoneAddComponent,
  BasedataBaseArchivesCollectionLineAddComponent,
  BasedataBaseArchivesCostAddComponent,
  BasedataMilestoneCategoryEditComponent,
  BasedataBaseArchivesCollectionLineViewComponent,
  BasedataBaseArchivesCostViewComponent,
];

@NgModule({
  imports: [SharedModule, BasedataRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class BasedataModule {}
