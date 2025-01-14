import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AutomaticLogonRoutingModule } from './automatic-logon-routing.module';
import { AutomaticLogonListComponent } from './list/list.component';

const COMPONENTS = [
  AutomaticLogonListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    AutomaticLogonRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AutomaticLogonModule { }
