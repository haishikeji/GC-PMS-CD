import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { PermissionDataRule } from 'app/entity/permission-data-rule';
import { DictService } from 'app/services/dict.service';
import { PermissionDataRuleService } from 'app/services/permission-data-rule.service';
import { I18NService } from '@core';
import { messageShared } from '@shared/utils/message';

@Component({
  selector: 'app-system-menu-data-roles-data-roles-edit',
  templateUrl: './data-roles-edit.component.html',
})
export class SystemMenuDataRolesDataRolesEditComponent implements OnInit {

  constructor(
    private nzModalRef: NzModalRef<any>,
    private dictService: DictService,
    private permissionDataRuleService: PermissionDataRuleService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService
  ) { }

  ngOnInit(): void {
    this.getRuleConditionsList();
    if(this.permissID!=""){
      this.getPermissById();
    }
  }

  permissionDataRule: PermissionDataRule = {};//数据规则对象

  /**
   * 查询条件规则下拉列表数据
   */
  ruleConditionsList: any;
  getRuleConditionsList() {
    this.dictService.getByDictCode("rule_conditions").then((response) => {
      this.ruleConditionsList = response.result;
    })
  }

  /**
   * 根据数据规则id查询所修改的对象数据
   */
  getPermissById(){
    this.permissionDataRuleService.getById(this.permissID).then((response)=>{
      this.permissionDataRule=response.result
    })
  }

  /**
   * 保存按钮
   * @param menuId 菜单id
   * @param permissID 数据规则id
   */
  @Input() permissID="";
  handleOk(menuId: string) {
    return new Promise((resolve, reject) => {
      this.permissionDataRule.permissionId = menuId;//菜单id
      //判断是否新增/修改
      if (this.permissID == null || this.permissID == "") {
        //新增
        this.permissionDataRuleService.add(this.permissionDataRule).then((response) => {
          if (response.success) {
            //新增成功
            this.nzNotificationService.success(this.i18NService.fanyi("newsuccess"), "");
            this.nzModalRef.close();
            resolve();
          } else {
            //新增失败
            this.nzNotificationService.error(this.i18NService.fanyi("newfailure"), messageShared(this.i18NService,response.message));
          }
        })
      } else {
        //修改
        this.permissionDataRule.id=this.permissID;//数据规则id
        this.permissionDataRuleService.update(this.permissionDataRule).then((response) => {
          if (response.success) {
            //修改成功
            this.nzNotificationService.success(this.i18NService.fanyi("successful.revision"), "");
            this.nzModalRef.close();
            resolve();
          } else {
            //修改失败
            this.nzNotificationService.error(this.i18NService.fanyi("modification.failed"), messageShared(this.i18NService,response.message));
          }
        })
      }

    })
  }

  /**
   * 关闭
   */
  close() {
    this.nzModalRef.close();
  }
}
