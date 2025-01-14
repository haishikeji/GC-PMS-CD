import { I18NService } from './../../../core/i18n/i18n.service';
import { UserService } from 'app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { environment } from '@env/environment';
import { User } from 'app/entity/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { EventManager } from '@angular/platform-browser';
import { Role } from 'app/entity/role';
import { RoleService } from 'app/services/role.service';
import { messageShared } from '@shared/utils/message';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'app-system-user-user',
  templateUrl: './user.component.html',
})
export class SystemUserComponent implements OnInit {

  constructor(
    private notification: NzNotificationService,
    private userService: UserService,
    private personnelService: PersonnelService,
    private fb: FormBuilder,
    private i18NService: I18NService,
    private eventManager: EventManager,
    private roleService:RoleService,
    private settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.initUser();
    this.getUsers(1);
    this.getRole();
    this.validateForm = this.fb.group({
      values: [null, Validators.required],
    });
  }
  page = {
    total: 0,
    size: 10,
    current: 1
  }
  pageNo = 0;
  pageIndexChange(event) {
    this.pageNo = event;
    this.getUsers(event);
  }
  listOfMapData = [];
  isSpinning = false;
  picturePrefix = environment.SERVER_URL + "sys/common/view/";
  user: User;
  tripledes = require("crypto-js/tripledes");
  cryptoJS = require("crypto-js");

  

  //获取用户菜单信息
  getUsers(pageNo) {
    this.isSpinning = true;
    this.user.pageNo = pageNo;
    this.user.roleIdList=this.role;
    //除admin需要按照组织查询
    if(this.settingsService.user.name!="admin"){
      this.user.pkOrg=sessionStorage.getItem("pkOrg");
    }
    this.userService.getUsers1(this.user).then((response) => {
      this.listOfMapData = response.result.records;
      this.listOfMapData.forEach(element => {
        if (element.email) {
          // element.email = this.tripledes.decrypt(element.email, 'email').toString(this.cryptoJS.enc.Utf8);
        }
      });
      this.page = response.result
      this.isSpinning = false;
    });
  }
  confirmDel(id: string) {
    this.userService.delete(id).then((response) => {
      if (response.success) {
        this.notification.success(this.i18NService.fanyi("successful.deletion"), "");
        this.getUsers(this.pageNo);
      } else {
        this.notification.success(this.i18NService.fanyi("delete.failed"), response.message);
      }
    });
  }
  cancelDel() {

  }

  confirmFrozen(id) {
    const body = {
      ids: id,
      status: "2"//1正常2冻结
    }
    this.userService.frozenBatch(body).then((response) => {
      if (response.success) {
        this.notification.success(this.i18NService.fanyi("freeze.frozen"), "");
        this.getUsers(this.pageNo);
      } else {
        this.notification.success(this.i18NService.fanyi("freeze.failure"), response.message);
      }
    });
  }
  confirmUnfrozen(id) {
    const body = {
      ids: id,
      status: "1"//1正常2冻结
    }
    this.userService.frozenBatch(body).then((response) => {
      if (response.success) {
        this.notification.success(this.i18NService.fanyi("thawing.succeeded"), "");
        this.getUsers(this.pageNo);
      } else {
        this.notification.success(this.i18NService.fanyi("thaw.failure"), response.message);
      }
    });
  }


  isVisible = false;
  id: string = "";
  nzOptions = [];
  title = "";
  agentPerson(id: string, username: string, personnelId: string) {
    this.isVisible = true;
    this.id = id;
    this.title = this.i18NService.fanyi("agent") + ":[" + username + "]"
    this.personnelService.queryApprover(sessionStorage.getItem("pkOrg")).then((response) => {
      this.nzOptions = response.result;
      this.nzOptions.forEach(e => {
        e.children.forEach(element => {
          element.children.forEach(ele => {
            if (ele.id === personnelId) {
              this.validateForm.setValue({ values: [e.id, element.id, ele.id] });
            }
          });
        });
      })
    })
  }

  role = []; 

  roleList = [];// 角色元数据

  /**
   * 查询角色数据
   */
  getRole() {
    const role = new Role();
    role.pageSize = 20000;
    // role.delFlag="0";
    this.roleService.getRoles(role).then((response) => {
      this.roleList = response.result.records;
    });
  }


  handleCancel() {
    this.isVisible = false;
    this.validateForm.reset();
  }
  validateForm: FormGroup;
  handleOk() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    var value = this.validateForm.value;
    var valid = this.validateForm.valid;
    if (valid) {
      let body = {
        id: this.id,
        personnelId: value.values[2]
      }
      this.userService.agentPerson(body).then((response) => {
        if (response.success) {
          this.notification.success(this.i18NService.fanyi("agent.success"), "");
          this.getUsers(this.pageNo);
          this.handleCancel();
        } else {
          this.notification.error(this.i18NService.fanyi("agent.failed"), messageShared(this.i18NService,response.message));
        }
      })
    }
  }


  initUser() {
    this.user = {
      id: "",
      username: "",
      realname: "",
      salt: "",
      avatar: "",
      birthday: "",
      sex: "",
      email: "",
      phone: "",
      status: "",
      selectedroles: "",
      personnelId: "",
      roleId:""
    }
  }
}
