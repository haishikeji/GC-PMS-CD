import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { UserService } from 'app/services/user.service';
import { User } from 'app/entity/user';

@Component({
  selector: 'app-system-role-view-user',
  templateUrl: './view-user.component.html',
})
export class SystemRoleViewUserComponent implements OnInit {

  constructor(
    private modal: NzModalRef,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    //角色是否为空
    if(this.roleId){
      this.getUser();
    }
  }

  roleId="";//角色id
  roleName="";//角色名称
  userList:User[]=[];//用户集合

  /**
   * 获取用户信息
   */
  getUser(){
    this.userService.getUserByRoleId(this.roleId).then((response)=>{
      this.userList=response.result;
    })
  }

  /**
   * 关闭
   */
  close() {
    this.modal.destroy();
  }
}
