import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { PermissionDataRuleService } from 'app/services/permission-data-rule.service';
import { PermissionDataRule } from 'app/entity/permission-data-rule';
import { I18NService } from '@core';
import { SystemMenuDataRolesDataRolesEditComponent } from './data-roles-edit/data-roles-edit.component';

@Component({
  selector: 'app-system-menu-data-roles',
  templateUrl: './data-roles.component.html',
})
export class SystemMenuDataRolesComponent implements OnInit {

  constructor(
    private permissionDataRuleService: PermissionDataRuleService,
    private nzModalService: NzModalService,
    private i18NService: I18NService
  ) { }

  ngOnInit(): void {
    this.getDataRolesLiSTByMenuId();
  }

  permissionDataRule: PermissionDataRule = {};//数据规则对象
  isSpinning = false;//数据加载动画
  dataRolesList = [
    {}
  ];//数据规则集合

  /**
   * 根据菜单id查询所属数据规则
   */
  @Input() menuId = "";//菜单id
  getDataRolesLiSTByMenuId() {
    this.permissionDataRule.permissionId = this.menuId//菜单id
    this.permissionDataRule.pageSize=500;
    this.permissionDataRuleService.getListPermissionDataRule(this.permissionDataRule).then((response) => {
      this.dataRolesList = response.result.records
    })
  }

  /**
   * 新增数据规则
   */
  add() {
    this.nzModalService.create({
      nzTitle: this.i18NService.fanyi("data.roles.add"),
      nzWidth: 600,
      nzContent: SystemMenuDataRolesDataRolesEditComponent,
      nzComponentParams: {
        //菜单id
      },
      nzFooter: [
        {
          //取消按钮
          label: this.i18NService.fanyi("not"),
          type: "default",
          onClick: SystemMenuDataRolesDataRolesEditComponent => {
            //取消按钮回调
            SystemMenuDataRolesDataRolesEditComponent.close()
          }
        },
        {
          //确认按钮
          label:  this.i18NService.fanyi("ok"),
          type: "primary",
          onClick: SystemMenuDataRolesDataRolesEditComponent => {
            //确定按钮回调
            SystemMenuDataRolesDataRolesEditComponent.handleOk(this.menuId).then(() => {
              this.getDataRolesLiSTByMenuId()
            })
          }
        }
      ]
    })
  }

  /**
   * 修改链接
   * @param item 数据规则对象
   */
  update(item){
    this.nzModalService.create({
      nzTitle: this.i18NService.fanyi("data.roles.update"),
      nzWidth: 600,
      nzContent: SystemMenuDataRolesDataRolesEditComponent,
      nzComponentParams: {
        //数据规则id
        permissID:item.id
      },
      nzFooter: [
        {
          //取消按钮
          label: this.i18NService.fanyi("not"),
          type: "default",
          onClick: SystemMenuDataRolesDataRolesEditComponent => {
            //取消按钮回调
            SystemMenuDataRolesDataRolesEditComponent.close()
          }
        },
        {
          //确认按钮
          label:  this.i18NService.fanyi("ok"),
          type: "primary",
          onClick: SystemMenuDataRolesDataRolesEditComponent => {
            //确定按钮回调
            SystemMenuDataRolesDataRolesEditComponent.handleOk(this.menuId).then(() => {
              this.getDataRolesLiSTByMenuId()
            })
          }
        }
      ]
    })
  }

  close() {
  }
}
