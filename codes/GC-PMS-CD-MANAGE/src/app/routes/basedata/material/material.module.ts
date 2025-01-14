import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MaterialRoutingModule } from './material-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    MaterialRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class MaterialModule { }
