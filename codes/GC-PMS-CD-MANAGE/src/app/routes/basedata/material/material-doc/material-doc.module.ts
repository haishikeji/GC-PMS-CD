import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MaterialDocRoutingModule } from './material-doc-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    MaterialDocRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class MaterialDocModule { }
