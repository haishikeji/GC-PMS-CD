import { SystemMenuEditComponent } from './menu/edit/edit.component';
import { SystemMenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemDictComponent } from './dict/dict.component';
import { SystemUserComponent } from './user/user.component';
import { SystemDepartComponent } from './depart/depart.component';
import { SystemRoleComponent } from './role/role.component';
import { SystemRoleAuthComponent } from './role/auth/auth.component';
import { SystemPositionComponent } from './position/position.component';
import { SystemSerialPatternComponent } from './serial-pattern/serial-pattern.component';
import { SystemTimedTaskComponent } from './timed-task/timed-task.component';
import { RouteguardService } from '@core/guard/routeguard.service';
import { SystemDepartDetailsComponent } from './depart/details/details.component';
import { SystemUpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  { path:"menu", component:SystemMenuComponent,canActivate: [RouteguardService] },
  { path: 'dict', component: SystemDictComponent ,canActivate: [RouteguardService]},
  { path: 'user', component: SystemUserComponent ,canActivate: [RouteguardService]},
  { path: 'depart', component: SystemDepartComponent,canActivate: [RouteguardService]},
  { path: 'role', component: SystemRoleComponent,canActivate: [RouteguardService]},
  // { path: 'auth', component: SystemRoleAuthComponent },
  { path: 'position', component: SystemPositionComponent ,canActivate: [RouteguardService]}
,
  { path: 'serial-pattern', component: SystemSerialPatternComponent ,canActivate: [RouteguardService]},
  { path: 'timed-task', component: SystemTimedTaskComponent ,canActivate: [RouteguardService]}
,
  { path: 'details', component: SystemDepartDetailsComponent },
  { path: 'update-password', component: SystemUpdatePasswordComponent }]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
