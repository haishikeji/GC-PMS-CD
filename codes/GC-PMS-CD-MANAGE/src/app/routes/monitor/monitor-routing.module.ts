import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorLogComponent } from './log/log.component';
import { MonitorLogLoginLogComponent } from './log/login-log/login-log.component';
import { MonitorLogOperateLogComponent } from './log/operate-log/operate-log.component';
import { MonitorMessageComponent } from './message/message.component';
import { MonitorMessageDetailComponent } from './message/detail/detail.component';
import { MonitorEmailEncryptionDecryptComponent } from './email-encryption-decrypt/email-encryption-decrypt.component';

const routes: Routes = [

  { path: 'log', component: MonitorLogComponent },
  { path: 'login-log', component: MonitorLogLoginLogComponent },
  { path: 'operate-log', component: MonitorLogOperateLogComponent },
  { path: 'message', component: MonitorMessageComponent },
  { path: 'detail', component: MonitorMessageDetailComponent },
  //邮件加密或者解密
  { path: 'email-encryption-decrypt', component: MonitorEmailEncryptionDecryptComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
