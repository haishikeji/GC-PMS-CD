import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { PermissionDataRule } from 'app/entity/permission-data-rule';
import { PermissionDataRuleService } from 'app/services/permission-data-rule.service';
import { I18NService } from '@core';
import { RolePermission } from 'app/entity/role-permission';

@Component({
  selector: 'app-system-role-auth-auth-data-rules',
  templateUrl: './auth-data-rules.component.html',
  styles: [
    `
    .base{
      position: absolute;
      bottom: 0px;
      width: 100%;
      border-top: 1px solid rgb(232, 232, 232);
      padding: 10px 16px;
      text-align: right;
      left: 0px;
      background: #fff;
      z-index:99;
    }

    `
  ]
})
export class SystemRoleAuthAuthDataRulesComponent implements OnInit {

  constructor(
    private permissionDataRuleService: PermissionDataRuleService,
    private nzDrawerRef: NzDrawerRef<any>,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService
  ) { }

  ngOnInit(): void {
    this.getDataRolesLiSTByMenuId().then(()=>{
      this.getCheckedDataRoles();
    })
  }

  /**
   * 根据菜单id查询数据规则
   */
  dataRolesList = [];//数据规则数据
  @Input() menuId = "";//菜单id
  isSpinning=false;
  getDataRolesLiSTByMenuId() {
    return new Promise((resolve, reject) => {
      this.isSpinning=true;
      var permissionDataRule = new PermissionDataRule();
      permissionDataRule.permissionId = this.menuId//菜单id
      permissionDataRule.pageSize = 500;
      this.permissionDataRuleService.getListPermissionDataRule(permissionDataRule).then((response) => {
        this.dataRolesList = response.result.records
        resolve();
      })
    })
  }

  /**
   *已经授权的数据规则默认选中
   */
  getCheckedDataRoles() {
    var rolePermission = new RolePermission();
    rolePermission.permissionId = this.menuId;//菜单id
    rolePermission.roleId = this.roleId;//角色id
    this.permissionDataRuleService.getDataRuleIds(rolePermission).then((response) => {
      //id相等则设置复选框未选中
      this.listOfDisplayData.forEach(element => {
        if(response!=null){
          response.result.forEach(ruleIds => {
            if (element.id == ruleIds) {
              this.mapOfCheckedId[element.id] = true;
            }
          });
        }
      });
      this.refreshStatus();
      this.isSpinning=false;
    })
  }

  /**
   * 保存按钮
   */
  @Input() roleId = "";//角色id
  save() {
    var listIds = [];//多个数据规则价id
    this.listOfDisplayData.forEach(element => {
      //获取选中的报价id
      if (this.mapOfCheckedId[element.id]) {
        listIds.push(element.id)
      }
    });
    var rolePermission = new RolePermission();
    rolePermission.permissionId = this.menuId;//菜单id
    rolePermission.roleId = this.roleId;//角色id
    //获取数据规则ids=>字符串
    var i = 0;
    listIds.forEach(element => {
      if (i == 0) {
        rolePermission.dataRuleIds = element
      } else {
        rolePermission.dataRuleIds = "," + element
      }
      i++
    });
    this.permissionDataRuleService.updateDataRule(rolePermission).then((response) => {
      if (response.success) {
        //授权成功
        this.nzNotificationService.success(this.i18NService.fanyi("data.roles.ok"), "");
        this.nzDrawerRef.close();
      } else {
        //授权失败
        this.nzNotificationService.success(this.i18NService.fanyi("data.roles.not"), "");
      }
    })
  }

  /**
   * 关闭按钮
   */
  close() {
    this.nzDrawerRef.close();
  }

  // checkbox是否被选中
  isAllDisplayDataChecked = false;
  // checkbox不确定状态
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  listOfDisplayData: any[] = [];
  // 当前页
  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }
  // checkbox选中状态以及选择框不确定状态
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }
  // 全选
  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }
}
