import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { QualityControlRoutingModule } from './quality-control-routing.module';
import { QualityControlControlBioanalyticalverificationComponent } from './control-bioanalyticalverification/control-bioanalyticalverification.component';
import { QualityControlControlBioanalyticalverificationBfIndexComponent } from './control-bioanalyticalverification/bf-index/bf-index.component';
import { QualityControlControlBioanalysisSampleComponent } from './control-bioanalysis-sample/control-bioanalysis-sample.component';
import { QualityControlControlBioanalysisSampleBsIndexComponent } from './control-bioanalysis-sample/bs-index/bs-index.component';
import { QualityControlPledgeBioanalyticalVerificationComponent } from './pledge-bioanalytical-verification/pledge-bioanalytical-verification.component';
import { QualityControlPledgeBioanalyticalVerificationBvIndexComponent } from './pledge-bioanalytical-verification/bv-index/bv-index.component';
import { QualityControlPledgeBioanalysisSampleComponent } from './pledge-bioanalysis-sample/pledge-bioanalysis-sample.component';
import { QualityControlPledgeBioanalysisSampleBsIndexComponent } from './pledge-bioanalysis-sample/bs-index/bs-index.component';
import { QualityControlProcessAndFacilityComponent } from './process-and-facility/process-and-facility.component';
import { QualityControlProcessAndFacilityHomePageComponent } from './process-and-facility/home-page/home-page.component';

const COMPONENTS = [
  QualityControlControlBioanalyticalverificationComponent,
  QualityControlControlBioanalyticalverificationBfIndexComponent,
  QualityControlControlBioanalysisSampleComponent,
  QualityControlControlBioanalysisSampleBsIndexComponent,
  QualityControlPledgeBioanalyticalVerificationComponent,
  QualityControlPledgeBioanalyticalVerificationBvIndexComponent,
  QualityControlPledgeBioanalysisSampleComponent,
  QualityControlPledgeBioanalysisSampleBsIndexComponent,
  QualityControlProcessAndFacilityComponent,
  QualityControlProcessAndFacilityHomePageComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    QualityControlRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class QualityControlModule { }
