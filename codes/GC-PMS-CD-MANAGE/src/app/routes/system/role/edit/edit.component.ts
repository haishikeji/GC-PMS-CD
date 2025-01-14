import { I18NService } from './../../../../core/i18n/i18n.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { Role } from 'app/entity/role';
import { RoleService } from 'app/services/role.service';

@Component({
  selector: 'app-system-role-edit',
  templateUrl: './edit.component.html',
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
export class SystemRoleEditComponent implements OnInit {

  constructor(
    private notification: NzNotificationService,
    private roleService:RoleService,
    private i18NService:I18NService,
  ) {}

  ngOnInit(): void {
    this.role = {
      roleCode:"",
      roleName:""
    }
  }
  role:Role;
  visible = false;
  title = "";
  @Output() afterSave = new EventEmitter<{}>();
  //保存
  save() {
    
    if(this.role.id==null || this.role.id==""){
      this.role.pkOrg=sessionStorage.getItem("pkOrg")
      this.roleService.add(this.role).then((response) => {
        this.notification.success(this.i18NService.fanyi("insert.success"),"");
        this.afterSave.emit();
        this.initRole();
        this.close();
      }).catch((err)=> {
        this.notification.success(this.i18NService.fanyi("insert.defeated"),err.message);
      })
    }else{
      this.roleService.edit(this.role).then((response) => {
        this.notification.success(this.i18NService.fanyi("successful.revision"),"");
        this.afterSave.emit();
        this.initRole();
        this.close();
      }).catch((err)=> {
        this.notification.success("modification.failed",err.message);
      })
    }
  }
  //打开新增/修改抽屉
  open(title:string,role:Role): void {
    this.visible = true;
    this.title = title;
    if(role!=null){
      this.roleService.queryById(role.id).then((response) => {
        this.role = response.result;
      })
    }
  }

  close(): void {
    this.visible = false;
    this.initRole();
  }
  //初始化表单
  initRole(){
    this.role = {
      roleCode:"",
      roleName:"",
      description:""
    }
  }
}
