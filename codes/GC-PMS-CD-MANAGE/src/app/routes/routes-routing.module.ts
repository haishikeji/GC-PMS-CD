import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { ContractProcessViewProcessViewComponent } from './contract-management/contract-process-view/process-view/process-view.component';
import { AutomaticLogonListComponent } from './automatic-logon/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    canActivateChild: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard/analysis', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
      { path: 'dashboard/v1', component: DashboardV1Component },
      { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
      { path: 'dashboard/monitor', component: DashboardMonitorComponent },
      { path: 'dashboard/workplace', component: DashboardWorkplaceComponent },
      { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' },
      { path: 'style', loadChildren: './style/style.module#StyleModule' },
      { path: 'delon', loadChildren: './delon/delon.module#DelonModule' },
      { path: 'extras', loadChildren: './extras/extras.module#ExtrasModule' },
      { path: 'pro', loadChildren: './pro/pro.module#ProModule' },
      // Exception
      { path: 'exception', loadChildren: './exception/exception.module#ExceptionModule' },
      // System
      { path: 'system', loadChildren: './system/system.module#SystemModule' },
      // System
      { path: 'monitor', loadChildren: './monitor/monitor.module#MonitorModule' },
      { path: 'basedata', loadChildren: './basedata/basedata.module#BasedataModule' },
      // { path: 'pm', loadChildren: './pm/pm.module#PmModule' },
      //项目里程碑模板
      // { path: 'projectMilestones', loadChildren: './project-milestones/project-milestones.module#ProjectMilestonesModule' },
      // 财务管理
      // { path: 'financialManagement', loadChildren: './financial-management/financial-management.module#FinancialManagementModule' },
      //样本及耗材管理
      // { path: 'samplesAndConsumables', loadChildren: './samples-and-consumables/samples-and-consumables.module#SamplesAndConsumablesModule' },
      // 质量管理
      { path: 'qualityControl', loadChildren: './quality-control/quality-control.module#QualityControlModule' }
      // { path: 'quality-management', loadChildren: './quality-management/quality-management.module#QualityManagementModule' },
      //项目管理
      ,{ path: 'project-manage-archives', loadChildren: './project-manage-archives/project-manage-archives.module#ProjectManageArchivesModule' }
      //日常工作
      ,{ path: 'project-work', loadChildren: './project-work/project-work.module#ProjectWorkModule' }
      //发票管理
      ,{ path: 'invoice-management', loadChildren: './invoice-management/invoice-management.module#InvoiceManagementModule' }
      //收付款管理
      ,{ path: 'down-payment-management', loadChildren: './down-payment-management/down-payment-management.module#DownPaymentManagementModule' }
      //费用报销
      ,{ path: 'expense-reimbursement', loadChildren: './expense-reimbursement/expense-reimbursement.module#ExpenseReimbursementModule' }
      //报表
      ,{ path: 'report-form', loadChildren: './report-form/report-form.module#ReportFormModule' }
      //合同管理
      ,{path:'contract-management',loadChildren:'./contract-management/contract-management.module#ContractManagementModule'}
      //自动登录
      ,{path:'automatic-logon',loadChildren:'./automatic-logon/automatic-logon.module#AutomaticLogonModule'}
  ],
  },
  // 全屏布局
  {
    path: 'data-v',
    component: LayoutFullScreenComponent,
    children: [{ path: '', loadChildren: './data-v/data-v.module#DataVModule' }],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录', titleI18n: 'app.login.login' },
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: '注册', titleI18n: 'app.register.register' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果', titleI18n: 'app.register.register' },
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock' },
      },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  //外部项目跳转
  {path:'automatic-logon-list',component:AutomaticLogonListComponent},
  { path:'contract-process-view',component:ContractProcessViewProcessViewComponent},
  { path: '**', redirectTo: 'exception/404' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
