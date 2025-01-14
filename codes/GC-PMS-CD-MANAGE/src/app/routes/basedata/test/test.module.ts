import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { TestRoutingModule } from './test-routing.module';
import { TestAddComponent } from './add/add.component';

const COMPONENTS = [TestAddComponent];
const COMPONENTS_NOROUNT = [
  ];

@NgModule({
  imports: [
    SharedModule,
    TestRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TestModule { }
