import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProjectManageArchivesService } from 'app/services/project-manage-archives/project-manage-archives.service';
import { ProjectManageArchivesViewEssentialInformationComponent } from './essential-information/essential-information.component';
import { ProjectManageArchivesViewBusinessAffairsComponent } from './business-affairs/business-affairs.component';
import { ProjectManageArchivesViewImplementationComponent } from './implementation/implementation.component';
import { ProjectManageArchivesViewDevelopmentComponent } from './development/development.component';
import { ProjectManageArchivesViewServicetaComponent } from './serviceta/serviceta.component';

@Component({
  selector: 'app-project-manage-archives-view',
  templateUrl: './view.component.html',
  styles: [
    `
      .base {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid rgb(232, 232, 232);
        padding: 6px 16px;
        text-align: right;
        left: 0px;
        background: #fff;
        z-index: 99;
      }
    `,
  ],
})
export class ProjectManageArchivesViewComponent implements OnInit {

  constructor(
    private projectManageArchivesService:ProjectManageArchivesService,
    private drawerRef:NzDrawerRef
  ) { }
  isLoadingSave=false;
  //基本信息
  @ViewChild('essentialInformation') essentialInformation: ProjectManageArchivesViewEssentialInformationComponent;
  //商务
  @ViewChild('businessAffairs') businessAffairs: ProjectManageArchivesViewBusinessAffairsComponent;
  //实施
  @ViewChild('implementation') implementation: ProjectManageArchivesViewImplementationComponent;
  //开发
  @ViewChild('development') development: ProjectManageArchivesViewDevelopmentComponent;
  //服务
  @ViewChild('serviceta') serviceta: ProjectManageArchivesViewServicetaComponent;

  ngOnInit(): void {
    this.isLoadingSave=true;
    this.getById().then(()=>{
      this.isLoadingSave=false;
    });
  }

  close() {
    this.drawerRef.close(true);
  }

  /**
   * 根据类型id回写数据到实施、开发、服务页签的汇款信息
   * @param data 计划对象
   */
  remittanceInformationChange(data) {
    //实施页签
    if (data.planName.indexOf("实施")!==-1) {
      this.implementation.remittanceInformation = data;
    } else if (data.planName.indexOf("开发")!==-1) {
      //开发
      this.development.remittanceInformation = data;
    } else if (data.planName.indexOf("服务")!==-1) {
      //服务
      this.serviceta.remittanceInformation = data;
    }
  }

  /**
   * 修改根据id获取所有数据
   */
  id = '';
  getById() {
    return new Promise(resolve => {
      this.projectManageArchivesService.getListById(this.id).then(response => {
        if (response.result) {
          let projectManageArchives = JSON.parse(JSON.stringify(response.result));
          // //基本信息
          // this.projectManageArchivesaEntiy(projectManageArchives);
          // ///////////////基本信息页签
          this.essentialInformation.projectManageArchivesa = projectManageArchives;
          ///////////////商务页签
          //主表数据
          this.businessAffairs.projectManageArchives = projectManageArchives;
          //收款计划
          if (projectManageArchives.bsInfo.coPlanList) {
            this.businessAffairs.collectionPlanList = projectManageArchives.bsInfo.coPlanList;
          }
          //回款情况
          if (projectManageArchives.bsInfo.coSituationList) {
            this.businessAffairs.paymentCollectionList = projectManageArchives.bsInfo.coSituationList;
          }
          //付款计划
          if (projectManageArchives.bsInfo.payPlanList) {
            this.businessAffairs.paymentPlanList = projectManageArchives.bsInfo.payPlanList;
          }
          //付款情况
          if (projectManageArchives.bsInfo.paySituationList) {
            this.businessAffairs.paymentStatusList = projectManageArchives.bsInfo.paySituationList;
          }
          //对应的收款情况
          this.businessAffairs.paymentCollectionList.forEach(element => {
            this.remittanceInformationChange(element);
          });
          /////////////////实施
          //主表基本数据
          this.implementation.projectManageArchives=projectManageArchives
          //里程碑明细
          this.implementation.listOfMapData = projectManageArchives.ipInfo.planList;
          this.implementation.getLoding();
          ////////////////开发
          this.development.projectManageArchives=projectManageArchives
          this.development.listOfMapData = projectManageArchives.deInfo.planList;
          this.development.getLoding();
          // ////////////////服务
          this.serviceta.projectManageArchives=projectManageArchives
          this.serviceta.listOfMapData = projectManageArchives.seInfo.planList;
          this.serviceta.getLoding();
          resolve();
        }
      });
    });
  }
}
