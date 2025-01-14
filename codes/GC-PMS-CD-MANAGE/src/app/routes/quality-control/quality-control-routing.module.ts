import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [

  { path: '', component: QualityControlControlBioanalyticalverificationComponent },
  { path: '', component: QualityControlControlBioanalyticalverificationBfIndexComponent },
  { path: '', component: QualityControlControlBioanalysisSampleComponent },
  { path: '', component: QualityControlControlBioanalysisSampleBsIndexComponent },
  { path: '', component: QualityControlPledgeBioanalyticalVerificationComponent },
  { path: '', component: QualityControlPledgeBioanalyticalVerificationBvIndexComponent },
  { path: '', component: QualityControlPledgeBioanalysisSampleComponent },
  { path: '', component: QualityControlPledgeBioanalysisSampleBsIndexComponent },
  { path: '', component: QualityControlProcessAndFacilityComponent },
  { path: '', component: QualityControlProcessAndFacilityHomePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityControlRoutingModule { }
