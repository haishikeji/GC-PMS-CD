import { filter } from 'rxjs/operators';
import { MenuService } from 'app/services/menu.service';
import { NzFormatEmitEvent, NzTreeNodeComponent, NzTreeService, NzTreeBaseService, NzTreeComponent, NzNotificationService, NzModalService, NzDrawerService, NzTreeNode } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { Role } from 'app/entity/role';
import { RoleService } from 'app/services/role.service';
import { I18NService } from '@core';
import { SystemRoleAuthAuthDataRulesComponent } from './auth-data-rules/auth-data-rules.component';

@Component({
  selector: 'app-system-role-auth',
  templateUrl: './auth.component.html',
  styles: [
    `
    .footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
      border-top: 1px solid rgb(232, 232, 232);
      padding: 10px 16px;
      text-align: right;
      left: 0px;
      background: #fff;
    }
    `
  ]
})
export class SystemRoleAuthComponent implements OnInit {

  constructor(private roleService: RoleService, private menuService: MenuService, private notification: NzNotificationService,
    private i18NService: I18NService,
    private nzDrawerService: NzDrawerService
  ) { }

  ngOnInit() {

  }

  visible = false;
  roleId: String;
  checkStrictly = true;
  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent;
  //打开授权抽屉
  open(role: Role): void {
    this.roleId = role.id;
    this.visible = true;
    this.getMenuTreeList(role.id);
    this.checkStrictly = true;
  }

  close(): void {
    this.visible = false;
    this.isSaving = false;
  }

  getMenuTreeList(id) {
    this.menuService.queryTreeList().then((response) => {
      this.nodes = response.result.treeList;
      this.ids = response.result.ids;
      this.defaultExpandedKeys = this.ids;
      if (id != null && id != "") {
        this.roleService.queryRolePermission(id).then((response) => {
          this.defaultCheckedKeys = response.result;
          this.defaultSelectedKeys = response.result;
        })
      }
    })
  }

  ids = [];
  defaultCheckedKeys = [];
  defaultSelectedKeys = [];
  defaultExpandedKeys = [];
  checkedKeys: string;
  nodes = [];

  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event);
  }

  operateTree(id: number) {
    if (id == 0) {
      this.checkStrictly = false;
    }
    if (id == 1) {
      this.checkStrictly = true;
    }
    if (id == 2) {
      this.defaultCheckedKeys = this.ids;
    }
    if (id == 3) {
      this.defaultCheckedKeys = [];
    }
    if (id == 4) {
      this.defaultExpandedKeys = this.ids;
    }
    if (id == 5) {
      this.defaultExpandedKeys = [];
    }
  }
  isSaving = false;
  save() {
    this.isSaving = true;
    this.getAllCheckedNodes();
    const perms = {
      permissionIds: this.checkedKeys.substring(0, this.checkedKeys.length - 1),
      roleId: this.roleId
    }
    this.roleService.saveRolePermission(perms).then((response) => {
      console.log(response)
      if (response.success) {
        this.notification.success(this.i18NService.fanyi("data.roles.ok"), "");
        this.visible = false;
        this.isSaving = false;
      }
    })
  }

  getAllCheckedNodes() {
    let nodes = this.nzTreeComponent.getCheckedNodeList();
    let halfNodes = this.nzTreeComponent.getHalfCheckedNodeList();
    this.checkedKeys = "";
    halfNodes.forEach(halfNode => {
      this.checkedKeys += halfNode.key + ",";
    })
    this.getCheckedNodes(nodes);
  }

  getCheckedNodes(nodes: NzTreeNode[]) {
    nodes.forEach(e => {
      if (e.isChecked) {
        if (this.checkedKeys.indexOf(e.key) === -1) {
        this.checkedKeys += e.key + ",";
        if (e.children != null && e.children.length > 0) {
          this.getCheckedNodes(e.children);
        }
      }
    }
    })
}

/**
 * 点击权限节点事件
 * @param event 节点对象
 */
treeClick(event){
  console.log(event)
  //菜单对象
  var menu = event.node.origin;
  //创建数据规则配置抽屉
  const drawerRef = this.nzDrawerService.create<SystemRoleAuthAuthDataRulesComponent, {}>({
    //数据规则配置
    nzTitle: this.i18NService.fanyi("data.roles.configuration"),
    nzWidth: 400,
    nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
    nzContent: SystemRoleAuthAuthDataRulesComponent,
    nzContentParams: {
      //菜单id
      menuId: menu.value,
      //角色id
      roleId: this.roleId
    }
  })
}
}
