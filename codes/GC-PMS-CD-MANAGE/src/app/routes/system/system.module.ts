import { SystemMenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SystemRoutingModule } from './system-routing.module';
import { MenuService } from 'app/services/menu.service';
import { SystemMenuEditComponent } from './menu/edit/edit.component';
import { SystemDictComponent } from './dict/dict.component';
import { SystemDictAddComponent } from './dict/add/add.component';
import { SystemMenuIconComponent } from './menu/icon/icon.component';
import { SystemUserComponent } from './user/user.component';
import { UserService } from 'app/services/user.service';
import { SystemDepartComponent } from './depart/depart.component';
import { DictService } from 'app/services/dict.service';
import { SystemRoleComponent } from './role/role.component';
import { RoleService } from 'app/services/role.service';
import { SystemDepartAddComponent } from './depart/add/add.component';
import { SystemRoleEditComponent } from './role/edit/edit.component';
import { SystemRoleAuthComponent } from './role/auth/auth.component';
import { SystemPositionComponent } from './position/position.component';
import { SystemPositionEditComponent } from './position/edit/edit.component';
import { SystemDepartPersonnelAddComponent } from './depart/personnel-add/personnel-add.component';
import { SystemDictConfigComponent } from './dict/config/config.component';
import { SystemDictConfigEditComponent } from './dict/config/edit/edit.component';
import { SystemUserEditComponent } from './user/edit/edit.component';
import { SystemUserViewComponent } from './user/view/view.component';
import { SystemUserAddComponent } from './user/add/add.component';
import { SystemUserPasswordComponent } from './user/password/password.component';
import { SystemSerialPatternComponent } from './serial-pattern/serial-pattern.component';
import { SystemSerialPatternAddComponent } from './serial-pattern/add/add.component';
import { SystemMenuDataRolesComponent } from './menu/data-roles/data-roles.component';
import { SystemMenuDataRolesDataRolesEditComponent } from './menu/data-roles/data-roles-edit/data-roles-edit.component';
import { SystemRoleAuthAuthDataRulesComponent } from './role/auth/auth-data-rules/auth-data-rules.component';
import { SystemTimedTaskComponent } from './timed-task/timed-task.component';
import { SystemTimedTaskAddComponent } from './timed-task/add/add.component';
import { SystemDepartDetailsComponent } from './depart/details/details.component';
import { SystemRoleViewUserComponent } from './role/view-user/view-user.component';
import { SystemUpdatePasswordComponent } from './update-password/update-password.component';
import { SystemDepartPersonnelAddSelectPkOrgComponent } from './depart/personnel-add/select-pk-org/select-pk-org.component';
const COMPONENTS = [SystemDictComponent,
  SystemUserComponent,
  SystemDepartComponent,
  SystemRoleComponent,
  SystemRoleAuthComponent,
  SystemPositionComponent,
  SystemUserViewComponent,
  SystemUserEditComponent,
  SystemUserAddComponent
,
  SystemSerialPatternComponent,
  SystemTimedTaskComponent,
  SystemDepartDetailsComponent,
  SystemUpdatePasswordComponent];
const COMPONENTS_NOROUNT = [SystemMenuEditComponent,
  SystemMenuIconComponent,
  SystemMenuEditComponent,
  SystemDictAddComponent,
  SystemDepartAddComponent,
  SystemRoleEditComponent,
  SystemPositionEditComponent,
  SystemDepartPersonnelAddComponent,
  SystemDictConfigComponent,
  SystemDictConfigEditComponent,
  SystemUserPasswordComponent
,
  SystemSerialPatternAddComponent,
  SystemMenuDataRolesComponent,
  SystemMenuDataRolesDataRolesEditComponent,
  SystemRoleAuthAuthDataRulesComponent,
  SystemTimedTaskAddComponent,
  SystemRoleViewUserComponent,
  SystemDepartPersonnelAddSelectPkOrgComponent];

@NgModule({
  imports: [
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    SystemMenuComponent
  ],
  providers: [MenuService, UserService, DictService, RoleService],
  entryComponents: COMPONENTS_NOROUNT
})
export class SystemModule { }
