import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorLogComponent } from './log/log.component';
import { MonitorLogLoginLogComponent } from './log/login-log/login-log.component';
import { MonitorLogOperateLogComponent } from './log/operate-log/operate-log.component';
import { MonitorMessageComponent } from './message/message.component';
import { MonitorMessageDetailComponent } from './message/detail/detail.component';
import { MonitorEmailEncryptionDecryptComponent } from './email-encryption-decrypt/email-encryption-decrypt.component';

const COMPONENTS = [
  MonitorLogComponent,
  MonitorLogLoginLogComponent,
  MonitorLogOperateLogComponent,
  MonitorMessageComponent,
  MonitorMessageDetailComponent,
  MonitorEmailEncryptionDecryptComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    MonitorRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class MonitorModule { }
