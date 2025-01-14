import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { Depart } from 'app/entity/depart';
import { DepartService } from 'app/services/depart.service';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { Page } from 'app/entity/page';
import { I18NService } from '@core';
import { messageShared } from '@shared/utils/message';

@Component({
  selector: 'app-system-depart-add',
  templateUrl: './add.component.html',
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
    `,
  ],
})
export class SystemDepartAddComponent implements OnInit {
  @Input() isOne = 0; //标题
  @Input() departId = ''; //部门id
  listDepart = []; //部门集合
  listPersonnel = []; //人员集合

  depart: Depart = {
    //初始化部门对象
    parentId: '',
    departName: '',
    departOrder: 0,
    mobile: '',
    address: '',
    memo: '',
    fax: '',
    pkPersonnel: '',
    type: '',
  }; //部门对象

  constructor(
    private nzDrawerRef: NzDrawerRef,
    private departService: DepartService, //部门service
    private message: NzMessageService,
    private notification: NzNotificationService,
    private personnelService: PersonnelService,
    private i18NService: I18NService,
  ) {}

  ngOnInit(): void {
    console.log(this.listDepart);
    if (this.isOne == 2) {
      this.getById();
    } else {
      this.depart.parentId = this.departId;
      // this.depart = {}
    }
    this.getAllDepart();
    this.getListPersonnel();
  }

  //查询全部人员
  getListPersonnel() {
    var page = new Page();
    page.pageSize = 500;
    this.personnelService.getAllPersonnel(page).then(response => {
      this.listPersonnel = response.result.records;
    });
  }
  //全部部门
  getAllDepart() {
    // var page =new Page();
    // page.pageSize=500;
    var depart = new Depart();
    depart.id = this.departId;
    this.departService.queryByNotParentId(depart).then(response => {
      this.listDepart = response.result;
    });
  }

  //根据id查询
  getById() {
    this.departService.getById(this.departId).then(response => {
      this.depart = response.result;
    });
  }

  //添加部门
  save() {
    if (this.isOne == 2) {
      //修改
      this.departService.updateDepart(this.depart).then(respon => {
        if (respon.success) {
          this.notification.success(this.i18NService.fanyi('successful.revision'), '');
          this.nzDrawerRef.close(true); //参数用于判断关闭抽屉是否刷新树列表
        } else {
          this.notification.error(
            this.i18NService.fanyi('modification.failed'),
            messageShared(this.i18NService, respon.message),
          );
        }
      });
    } else {
      //添加
      if (this.isOne == 0) {
        this.depart.type = '1';
      } else {
        this.depart.type = '2';
      }
      this.departService.addDepart(this.depart).then(response => {
        if (response.success) {
          //判断添加成功
          this.notification.success(this.i18NService.fanyi('insert.success'), '');
          this.nzDrawerRef.close(true); //参数用于判断关闭抽屉是否刷新树列表
        } else {
          this.notification.error(
            this.i18NService.fanyi('insert.defeated'),
            messageShared(this.i18NService, response.message),
          );
        }
      });
    }
  }

  close() {
    this.nzDrawerRef.close();
  }
}
