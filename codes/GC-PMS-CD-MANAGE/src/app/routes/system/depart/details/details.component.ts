import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Personnel } from 'app/entity/basedata/personnel';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { DepartService } from 'app/services/depart.service';
import { DictService } from 'app/services/dict.service';
import { Page } from 'app/entity/page';

@Component({
  selector: 'app-system-depart-details',
  templateUrl: './details.component.html',
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
export class SystemDepartDetailsComponent implements OnInit {

  constructor(private http: _HttpClient, private drawerRef: NzDrawerRef, private personnelService: PersonnelService,
    private departService: DepartService, private dictService: DictService) { }

  ngOnInit() {
    this.getDataList().then(() => {
      this.getDepartment().then(() => {
        this.getCompany().then(() => {
          this.getPeopleStatus().then(() => {
            this.getManagement();
            this.isLoading = false;
          })
        })
      });
    })
  }

  @Input() id;// id
  personnel: Personnel = {};
  company = null;// 公司
  departmentList = null;// 部门
  personStatus = null;// 人员状态
  managementList = null;
  isLoading = true;
  tripledes = require("crypto-js/tripledes");
  cryptoJS = require("crypto-js");



  /**
   * @description: 查询数据
   * @param {type} 
   * @author: 段亚鑫
   */s
  getDataList() {
    return new Promise((resolve) => {
      this.personnelService.getById(this.id).then((response) => {
        this.personnel = response.result;
        // this.personnel.email = this.tripledes.decrypt(this.personnel.email, 'email').toString(this.cryptoJS.enc.Utf8);
        resolve();
      })
    })
  }

  /**
   * @description: 公司
   * @param {type} 
   * @author: 段亚鑫
   */
  getDepartment() {
    return new Promise((resolve) => {
      this.departService.getByType("1").then((response) => {
        this.company = response.result;
        resolve();
      })
    })
  }

  /**
   * @description: 部门
   * @param {type} 
   * @author: 段亚鑫
   */
  getCompany() {
    return new Promise((resolve) => {
      this.departService.getByOrgId(this.personnel.pkOrg).then((response) => {
        this.departmentList = response.result;
        resolve();
      })
    })
  }

  /**
   * @description: 人员状态
   * @param {type} 
   * @author: 段亚鑫
   */
  getPeopleStatus() {
    return new Promise((resolve) => {
      this.dictService.getByDictCode("personnl_state").then((response) => {
        this.personStatus = response.result;
        resolve();
      })
    })
  }

  /**
   * @description: 直接领导
   * @param {type} 
   * @author: 段亚鑫
   */
  getManagement() {
    const page = new Page();
    page.pageSize = 500;
    this.personnelService.getAllPersonnel(page).then((response) => {
      this.managementList = response.result.records
    });
  }

  /**
   * @description: 关闭
   * @param {type} 
   * @author: 段亚鑫
   */
  close() {
    this.drawerRef.close();
  }
}
