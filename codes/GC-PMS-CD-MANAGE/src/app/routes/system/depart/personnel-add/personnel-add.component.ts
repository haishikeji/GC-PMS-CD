import { I18NService } from './../../../../core/i18n/i18n.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService, NzDrawerRef, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { DepartService } from 'app/services/depart.service';
import { Page } from 'app/entity/page';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { DictService } from 'app/services/dict.service';
import { Dict } from 'app/entity/dict';
import { messageShared } from '@shared/utils/message';
import { SystemDepartPersonnelAddSelectPkOrgComponent } from './select-pk-org/select-pk-org.component';

@Component({
  selector: 'app-system-depart-personnel-add',
  templateUrl: './personnel-add.component.html',
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
export class SystemDepartPersonnelAddComponent implements OnInit {

  personnel = {
    code: "",
    name: "",
    enName: "",//英文名称
    gender: "",//性别
    mobile: "",//手机
    tel: "",//电话
    pkDepart: "",//所属部门
    pkOrg: "",//所属公司
    pkDepartName: "",//所属部门名称
    pkOrgName: "",//所属公司名称
    status: "",//人员状态
    email: "",//邮箱
    pkPersonnel: "",//直属领导
    enable: ""//是否停用0正常1停用
  };//人员对象
  listOrg = [];//公司集合
  listDepart = [];//部门集合
  listPersonnel = [];//人员集合
  @Input() id = "";//人员id
  enable = false;//是否停用
  storageTypes: any;//人员状态
  tripledes = require("crypto-js/tripledes");
  cryptoJS = require("crypto-js");


  constructor(
    private departService: DepartService,
    private personnelService: PersonnelService,
    private notification: NzNotificationService,
    private nzDrawerRef: NzDrawerRef,
    private dictService: DictService,
    private i18NService: I18NService,
    private modalService:NzModalService
  ) { }
  disabled = false;
  ngOnInit(): void {
    if (this.id == "") {
    } else {
      this.personnelService.getById(this.id).then((response) => {
        this.disabled = true;
        this.personnel = response.result;
        // this.personnel.email = this.tripledes.decrypt(this.personnel.email, 'email').toString(this.cryptoJS.enc.Utf8);
        if (response.result.enable == "0") {
          this.enable = false;
        } else {
          this.enable = true;
        }
        if (response.result.pkOrg != "" && response.result.pkOrg != null) {
          this.getByOrgId(response.result.pkOrg);//根据公司查询部门
        }

      })
    }

    this.getByType()
    this.getListPersonnel()
    this.getInitData()
  }

  //人员状态
  getInitData() {
    this.dictService.getByDictCode("personnl_state").then((response) => {
      this.storageTypes = response.result;
    })
  }

  //根据类型查询公司和部门1公司2部门
  getByType() {
    //查询公司
    this.departService.getByType("1").then((response) => {
      this.listOrg = response.result
    })
  }

  //查询全部人员
  getListPersonnel() {
    var page = new Page();
    page.pageSize = 500;
    this.personnelService.getAllPersonnel(page).then((response) => {
      this.listPersonnel = response.result.records
    });
  }

  //公司下拉款选中
  companyChange(event) {
    if (event) {
      //是否有值
      this.getByOrgId(event);
    } else {
      this.listDepart = [];
    }
  }

  //(根据公司id查出部门下拉框)
  getByOrgId(orgId: string) {
    this.departService.getByOrgId(orgId).then((response) => {
      this.listDepart = response.result
    })
  }



  //保存
  save(value: any) {
    if (this.enable) {//是否停用
      this.personnel.enable = "1";
    } else {
      this.personnel.enable = "0";
    }
    console.error(this.personnel.email);
    if (this.personnel.email) {
      // this.personnel.email = this.tripledes.encrypt(this.personnel.email, 'email').toString();
    }
    if (this.id == "") {
      this.personnelService.addPersonnel(this.personnel).then((response) => {
        if (response.success) {
          this.notification.success(this.i18NService.fanyi("newsuccess"), "")
          this.nzDrawerRef.close(true);//关闭抽屉是否刷新列表
        } else {
          // this.personnel.email = this.tripledes.decrypt(this.personnel.email, 'email').toString(this.cryptoJS.enc.Utf8);
          this.notification.error(this.i18NService.fanyi("newfailure"), messageShared(this.i18NService,response.message))
        }
      })
    } else {
      this.personnelService.personnelUpdate(this.personnel).then((response) => {
        if (response.success) {
          this.notification.success(this.i18NService.fanyi("successful.revision"), "")
          this.nzDrawerRef.close(true);//关闭抽屉是否刷新列表
        } else {
          // this.personnel.email = this.tripledes.decrypt(this.personnel.email, 'email').toString(this.cryptoJS.enc.Utf8);
          this.notification.error(this.i18NService.fanyi("modification.failed"), messageShared(this.i18NService,response.message))
        }
      })
    }

  }

  /**
   * 选择公司按钮
   */
  selectPkOrg(){
    const modalRef = this.modalService.create({
      nzTitle: "选择公司与部门",
      nzContent: SystemDepartPersonnelAddSelectPkOrgComponent,
      nzWidth: 600,
      nzComponentParams:{
        personnelGet:this.personnel
      },
      nzFooter: [
        {
          label: "关闭",
          type: "default",
          onClick: addModel => {
            addModel.close()
          }
        },
        {
          label: "确定",
          type: "primary",
          // loading:this.modelSaveLoading,
          onClick: addModel => {
            addModel.submitForm().then(()=>{
              this.personnel.pkOrg=addModel.personnel.pkOrg;
              this.personnel.pkOrgName=addModel.personnel.pkOrgName;
              this.personnel.pkDepart=addModel.personnel.pkDepart;
              this.personnel.pkDepartName=addModel.personnel.pkDepartName;
            })
          }
        }
      ]
    })
  }

  close() {
    this.nzDrawerRef.close(false);//关闭抽屉是否刷新列表
  }


}
