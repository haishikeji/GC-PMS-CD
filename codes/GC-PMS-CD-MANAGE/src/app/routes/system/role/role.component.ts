import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { RoleService } from 'app/services/role.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Role } from 'app/entity/role';
import { Page } from 'app/entity/page';
import { I18NService } from '@core';
import { EventManager } from '@angular/platform-browser';
import { messageShared } from '@shared/utils/message';
import { SystemRoleViewUserComponent } from './view-user/view-user.component';

@Component({
  selector: 'app-system-role',
  templateUrl: './role.component.html',
})
export class SystemRoleComponent implements OnInit {

  page: any = {}

  role: Role={}


  constructor(
    private notification: NzNotificationService,
    private roleService: RoleService,
    private i18NService: I18NService,
    private eventManager: EventManager,
    private modalService:NzModalService
  ) { }

  ngOnInit() {
    this.getRoles();
    this.role = {
      id: "",
      roleCode: "",
      roleName: "",
      description: "",
      pageNo: 0,
      pkOrg:""
    }
  }

  listOfMapData = [];
  isSpinning = false;

  /**
   * 查询按钮
   */
  query() {
    this.role.pageNo = 1;
    this.getRoles();
  }

  // 获取用户菜单信息
  getRoles() {
    this.isSpinning = true;
    this.role.pkOrg=sessionStorage.getItem("pkOrg");
    this.roleService.getRoles1(this.role).then((response) => {
      console.error(response)
      this.page = response.result
      this.listOfMapData = response.result.records;
      this.isSpinning = false;
    });
  }
  pageIndexChange(event) {
    this.role.pageNo = event
    this.getRoles()
  }


  auth() {

  }

  /**
   * 删除按钮
   * @param id 角色id
   */
  confirmDel(id: string) {
    // alert(id)
    // return;
    //  财务管理、admin、项目经理、总经理、总监、商务经理、QA组、QC组,业务发展总监，业务发展经理，生物分析PM,生物分析负责人,生物分析助理,项目档案项目经理
    if (id == "09c4bfb12059760a8ada32d4c6826f6a" || id == "f6817f48af4fb3af11b9e8bf182f618b" || id == "98a506f628ddcfdd3dfe6100f6a11a4d" || id == "586e5a8cafaeb7291b482571c91a0181"
      || id == "fc0d11c839b7775ceba5e4fe5246c43c" || id == "4cf3bde0f8603470af52990e6abbf873" || id == "13605c578dba718b65e729df746dfa4f" || id == "d238a3825f90efea36ab12d356e3b39c" || id == "b4eaf9ec2e6b8cff076fedfe5ab29c77"
      || id === "fc0d11c839b7775ceba5e4fe5246c43c" || id === "4cf3bde0f8603470af52990e6abbf873" || id === "d103a38bb71de0b2536292e77f5fa483"
      || id === "b4eaf9ec2e6b8cff076fedfe5ab29c77" || id === "fb5fc6443cc7247ec33580a2350e0323" || id === "d89a49620758d4a5357a8afca152fc5c") {
      //系统内容角色不可删除
      this.notification.warning(this.i18NService.fanyi("user.not.delete"), "");
      return;
    }

    this.roleService.delete(id).then((response) => {
      if (response.success) {
        //删除成功
        this.notification.success(this.i18NService.fanyi("successful.deletion"), "");
        this.getRoles();
      } else {
        //删除失败
        this.notification.error(this.i18NService.fanyi("delete.failed"), messageShared(this.i18NService, response.message));
      }

    })
  }

  cancelDel() {

  }

  /**
   * 查看用户按钮
   */
 viewUser(item){
   //打开查看用户的model框
   const modalRef = this.modalService.create({
    nzTitle: this.i18NService.fanyi("View.users"),
    nzContent: SystemRoleViewUserComponent,
    nzWidth: 600,
    nzComponentParams:{
      roleId:item.id,//角色id
      roleName:item.roleName//角色名称
    },
    nzFooter: [
      {
        label: this.i18NService.fanyi("button.cancel"),
        type: "default",
        onClick: addModel => {
          addModel.close()
        }
      }
    ]
  })
 }
  
}
