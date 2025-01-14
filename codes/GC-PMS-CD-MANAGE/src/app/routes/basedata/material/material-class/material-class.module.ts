import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MaterialClassRoutingModule } from './material-class-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    MaterialClassRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class MaterialClassModule { }
