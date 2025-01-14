import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzDrawerRef, NzNotificationService } from 'ng-zorro-antd';
import { DictService } from 'app/services/dict.service';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { BaseArchivesMilestoneService } from 'app/services/basedata/base-archives-milestone.service';
import { I18NService } from '@core';
import { ProjectManageArchivesService } from 'app/services/project-manage-archives/project-manage-archives.service';
import { DatePipe } from '@angular/common';
import { ProjectManageArchivesUpdateEssentialInformationComponent } from './essential-information/essential-information.component';
import { ProjectManageArchivesUpdateBusinessAffairsComponent } from './business-affairs/business-affairs.component';
import { ProjectManageArchivesUpdateImplementationComponent } from './implementation/implementation.component';
import { ProjectManageArchivesUpdateDevelopmentComponent } from './development/development.component';
import { ProjectManageArchivesUpdateServicetaComponent } from './serviceta/serviceta.component';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';
import { BaseArchivesMilestone } from 'app/entity/basedata/base-archives-milestone';
import { recursiveQuery } from '@shared/utils/yuan copy';
import { BaseArchivesCollectionLine } from 'app/entity/basedata/base-archives-collection-line';
import { BaseArchivesCollectionLineService } from 'app/services/basedata/base-archives-collection-line.service';

@Component({
  selector: 'app-project-manage-archives-update',
  templateUrl: './update.component.html',
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
export class ProjectManageArchivesUpdateComponent implements OnInit {
  constructor(
    private drawerRef: NzDrawerRef,
    private dictService: DictService,
    private personnelService: PersonnelService,
    private baseArchivesMilestoneService: BaseArchivesMilestoneService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
    private projectManageArchivesService: ProjectManageArchivesService,
    private datePipe: DatePipe,
    private baseArchivesCollectionLineService:BaseArchivesCollectionLineService
  ) {}

  ngOnInit(): void {
    this.isLoadingSave = true;
    //计划类型
    this.getPlanType()
      .then(() => {
        //人员下拉
        return this.getPersonnelList();
      })
      .then(() => {
        //里程碑类型
        return this.getTypeList();
      })
      .then(() => {
        return this.getById();
      })
      .then(() => {
        this.isLoadingSave = false;
      });
  }

  isLoadingSave = false; //保存加载
  //基本信息
  @ViewChild('essentialInformation') essentialInformation: ProjectManageArchivesUpdateEssentialInformationComponent;
  //商务
  @ViewChild('businessAffairs') businessAffairs: ProjectManageArchivesUpdateBusinessAffairsComponent;
  //实施
  @ViewChild('implementation') implementation: ProjectManageArchivesUpdateImplementationComponent;
  //开发
  @ViewChild('development') development: ProjectManageArchivesUpdateDevelopmentComponent;
  //服务
  @ViewChild('serviceta') serviceta: ProjectManageArchivesUpdateServicetaComponent;

  /**
   * 计划类型查询
   */
  getPlanType() {
    return new Promise(resolve => {
      let baseArchivesCollectionLine=new BaseArchivesCollectionLine();
      baseArchivesCollectionLine.pageSize=20000;
      baseArchivesCollectionLine.pkOrg=sessionStorage.getItem("pkOrg");
      this.baseArchivesCollectionLineService.getList(baseArchivesCollectionLine).then((response)=>{
        if(response.success){
           //商务计划类型
          this.businessAffairs.planList = response.result.records;
        }
        resolve();
      })
    });
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
   * 基本信息的信息回写到其他页签
   */
  projectManageArchivesaEntiy(event) {
    //商务
    this.businessAffairs.projectManageArchives = event;
    //实施
    this.implementation.projectManageArchives = event;
    //开发
    this.development.projectManageArchives = event;
    //服务
    this.serviceta.projectManageArchives = event;
  }

  /**
   * 获取人员下拉数据到各个页签中
   */
  getPersonnelList() {
    return new Promise(resolve => {
      this.personnelService.queryApprover(sessionStorage.getItem('pkOrg')).then(response => {
        //基本信息页签人员
        this.essentialInformation.personnelList = JSON.parse(JSON.stringify(response.result));
        this.essentialInformation.saleManagerList = JSON.parse(JSON.stringify(response.result));
        this.essentialInformation.impManagerList = JSON.parse(JSON.stringify(response.result));
        this.essentialInformation.deManagerList = JSON.parse(JSON.stringify(response.result));
        this.essentialInformation.seManagerList = JSON.parse(JSON.stringify(response.result));
        //获取默认展开id
        this.essentialInformation.seManagerList.forEach(pkorg => {
          this.essentialInformation.expandKeys.push(pkorg.key)
        });
        //实施页签
        this.implementation.personnelList = JSON.parse(JSON.stringify(response.result));
        //获取默认展开id
        this.implementation.personnelList.forEach(pkorg => {
          this.implementation.expandKeys.push(pkorg.key)
        });
        //开发页签
        this.development.personnelList = JSON.parse(JSON.stringify(response.result));
        //获取默认展开id
        this.development.personnelList.forEach(pkorg => {
          this.development.expandKeys.push(pkorg.key)
        });
        //服务页签
        this.serviceta.personnelList = JSON.parse(JSON.stringify(response.result));
        //获取默认展开id
        this.serviceta.personnelList.forEach(pkorg => {
          this.serviceta.expandKeys.push(pkorg.key)
        });
        recursiveQuery(this.essentialInformation.personnelList);
        recursiveQuery(this.essentialInformation.saleManagerList);
        recursiveQuery(this.essentialInformation.impManagerList);
        recursiveQuery(this.essentialInformation.deManagerList);
        recursiveQuery(this.essentialInformation.seManagerList);
        //禁用公司、部分不可选
        //实施
        recursiveQuery(this.implementation.personnelList);
        //开发
        recursiveQuery(this.development.personnelList);
        //服务
        recursiveQuery(this.serviceta.personnelList);
        resolve();
      });
    });
  }

  /**
   * 获取里程碑类型到基本信息中
   */
  getTypeList() {
    return new Promise(resolve => {
      this.dictService.getByDictCode('base_archives_milestone_type').then(response => {
        this.essentialInformation.milestoneList = response.result;
        resolve();
      });
    });
  }

  /**
   * 根据里程碑类型查询商务的里程碑下拉数据以及实施、开发、服务的里程碑明细
   */
  milestone(event: ProjectManageArchives) {
    //商务里程碑下拉数据
    //查询条件
    this.getPartentList(event.milestoneId);
    //计划里程碑
    //查询条件
    // let baseArchivesMilestone2 = new BaseArchivesMilestone();
    // baseArchivesMilestone2.pkOrg = sessionStorage.getItem('pkOrg'); //组织
    // baseArchivesMilestone2.typeId = event.milestoneId;
    // //查询数据
    // this.baseArchivesMilestoneService.getTreeList(baseArchivesMilestone2).then(response => {
    //   if (response.result) {
    //     //实施
    //     this.implementation.listOfMapData = JSON.parse(JSON.stringify(response.result));
    //     this.implementation.getLoding();
    //     //开发
    //     this.development.listOfMapData = JSON.parse(JSON.stringify(response.result));
    //     this.development.getLoding();
    //     //服务
    //     this.serviceta.listOfMapData = JSON.parse(JSON.stringify(response.result));
    //     this.serviceta.getLoding();
    //   }
    // });
  }

  /**
   * 商务中里程碑下拉数据
   * @param milestoneId 里程碑类型id
   */
  getPartentList(milestoneId) {
    //查询条件
    let baseArchivesMilestone = new BaseArchivesMilestone();
    baseArchivesMilestone.parentId = '0';
    baseArchivesMilestone.typeId = milestoneId; //里程碑档案类型
    //查询数据
    this.baseArchivesMilestoneService.getAllParent(baseArchivesMilestone).then(response => {
      if (response.result) {
        this.businessAffairs.milestoneList = response.result;
      }
    });
  }

  /**
   * 保存接口
   */
  save() {
    return new Promise(resolve => {
      //基本信息中的
      if (this.essentialInformation.submitForm()) {
        this.isLoadingSave = true;
        //基本信息
        let projectManageArchives = this.essentialInformation.projectManageArchivesa;
        //组织
        projectManageArchives.pkOrg = sessionStorage.getItem('pkOrg');
        ////////////商务页签的计划表格数据
        //已回款金额
        projectManageArchives.received = this.businessAffairs.projectManageArchives.received;
        let bsInfo: any = {};
        this.getPlanListName(this.businessAffairs.collectionPlanList)
        this.getPlanListName(this.businessAffairs.paymentCollectionList)
        this.getPlanListName(this.businessAffairs.paymentPlanList)
        this.getPlanListName(this.businessAffairs.paymentStatusList)
        bsInfo.coPlanList = this.businessAffairs.collectionPlanList; //收款计划
        bsInfo.coSituationList = this.businessAffairs.paymentCollectionList; //收款情况
        bsInfo.payPlanList = this.businessAffairs.paymentPlanList; //付款计划
        bsInfo.paySituationList = this.businessAffairs.paymentStatusList; //付款情况
        projectManageArchives.bsInfo = bsInfo;
        ////////////实施页签的计划树形表格数据
        let ipInfo: any = {};
        let implementation = [];
        //获取计划里程碑明细
        this.getMileItem(this.implementation, implementation);
        ipInfo.planList = implementation;
        projectManageArchives.ipInfo = ipInfo;
        ////////////实施页签的计划树形表格数据
        let deInfo: any = {};
        let development = [];
        //获取计划里程碑明细
        this.getMileItem(this.development, development);
        deInfo.planList = development;
        projectManageArchives.deInfo = deInfo;
        ////////////实施页签的计划树形表格数据
        let seInfo: any = {};
        let serviceta = [];
        //获取计划里程碑明细
        this.getMileItem(this.serviceta, serviceta);
        seInfo.planList = serviceta;
        projectManageArchives.seInfo = seInfo;
        console.log(JSON.stringify(projectManageArchives));
        this.projectManageArchivesService.update(projectManageArchives).then(response => {
          if (response.success) {
            //保存成功
            this.isLoadingSave = false;
            this.nzNotificationService.success(this.i18NService.fanyi('save.ok'), '');
            this.drawerRef.close(true);
            resolve();
          } else {
            //保存失败
            this.isLoadingSave = false;
            this.nzNotificationService.error(this.i18NService.fanyi('save.not'), '');
          }
        });
      }
    });
  }

  /**
   * 获取计划的里程碑名称
   */
  getPlanListName(list){
    //循环表格数据
    list.forEach(element => {
      //判断是否选择里程碑
      if(element.mileId1){
        //循环商务页签中计划表中里程碑下拉数据获取名称
        this.businessAffairs.milestoneList.forEach(mile => {
          if(mile.id===element.mileId1){
            element.milestone1=mile.name;
          }
        });
      }else{
        element.milestone1="";
      }
      //判断是否选择里程碑
      if(element.mileId2){
        //循环商务页签中计划表中里程碑下拉数据获取名称
        this.businessAffairs.milestoneList.forEach(mile => {
          if(mile.id===element.mileId2){
            element.milestone2=mile.name;
          }
        });
      }else{
        element.milestone2="";
      }
      //判断是否选择里程碑
      if(element.mileId3){
        //循环商务页签中计划表中里程碑下拉数据获取名称
        this.businessAffairs.milestoneList.forEach(mile => {
          if(mile.id===element.mileId3){
            element.milestone3=mile.name;
          }
        });
      }else{
        element.milestone3="";
      }
      //判断是否选择里程碑
      if(element.mileId4){
        //循环商务页签中计划表中里程碑下拉数据获取名称
        this.businessAffairs.milestoneList.forEach(mile => {
          if(mile.id===element.mileId4){
            element.milestone4=mile.name;
          }
        });
      }else{
        element.milestone4="";
      }
      //判断是否选择里程碑
      if(element.mileId5){
        //循环商务页签中计划表中里程碑下拉数据获取名称
        this.businessAffairs.milestoneList.forEach(mile => {
          if(mile.id===element.mileId5){
            element.milestone5=mile.name;
          }
        });
      }else{
        element.milestone5="";
      }
    });
  }

  /**
   * 获取计划里程碑明细数据
   * @param component 页签组件对象
   * @param list 需要的保存集合
   */
  getMileItem(component, list) {
    component.listOfMapData.forEach(item => {
      component.mapOfExpandedData[item.key].forEach(element => {
        element.startDate = this.datePipe.transform(element.startDate, 'yyyy-MM-dd HH:mm:ss');
        element.endDate = this.datePipe.transform(element.endDate, 'yyyy-MM-dd HH:mm:ss');
        let names = ''; //人员名称
        let ids = ''; //人员id
        //获取执行人的名称和id
        if (element.executors) {
          element.executors.forEach(element => {
            component.personnelList.forEach(pkOrg => {
              pkOrg.children.forEach(depart => {
                depart.children.forEach(personnel => {
                  if (personnel.key === element) {
                    if (names === '') {
                      names = personnel.name;
                      ids = personnel.key;
                    } else {
                      names = names + '、' + personnel.name;
                      ids = ids + '、' + personnel.key;
                    }
                  }
                });
              });
            });
          });
        }
        element.keyId = element.key;
        element.executor = names;
        element.executorId = ids;
        list.push(element);
      });
    });
  }

  close() {
    this.drawerRef.close(true);
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
          ///////////////基本信息页签
          this.essentialInformation.projectManageArchivesa = projectManageArchives;
          //业务员多选数据
          this.essentialInformation.saleManIds = this.getPeronnelIds(projectManageArchives.saleManId);
          //实施顾问多选数据
          this.essentialInformation.impConsultantIds = this.getPeronnelIds(projectManageArchives.impConsultantId);
          //开发工程师多选数据
          this.essentialInformation.deEngineerIds = this.getPeronnelIds(projectManageArchives.deEngineerId);
          //服务工程师多选数据
          this.essentialInformation.seEngineerIds = this.getPeronnelIds(projectManageArchives.seEngineerId);
          ///////////////商务页签
          //主表数据
          // this.businessAffairs.projectManageArchives = projectManageArchives;
          //收款计划
          if (projectManageArchives.bsInfo.coPlanList) {
            this.businessAffairs.collectionPlanList = projectManageArchives.bsInfo.coPlanList;
            this.businessAffairs.collectionPlanSort = projectManageArchives.bsInfo.coPlanList.length + 1;
          }
          //回款情况
          if (projectManageArchives.bsInfo.coSituationList) {
            this.businessAffairs.paymentCollectionList = projectManageArchives.bsInfo.coSituationList;
            this.businessAffairs.paymentCollectionSort = projectManageArchives.bsInfo.coSituationList.length + 1;
          }
          //付款计划
          if (projectManageArchives.bsInfo.payPlanList) {
            this.businessAffairs.paymentPlanList = projectManageArchives.bsInfo.payPlanList;
            this.businessAffairs.paymentPlanSort = projectManageArchives.bsInfo.payPlanList.length + 1;
          }
          //付款情况
          if (projectManageArchives.bsInfo.paySituationList) {
            this.businessAffairs.paymentStatusList = projectManageArchives.bsInfo.paySituationList;
            this.businessAffairs.paymentStatusSort = projectManageArchives.bsInfo.paySituationList.length + 1;
          }
          //对应的收款情况
          this.businessAffairs.paymentCollectionList.forEach(element => {
            this.remittanceInformationChange(element);
          });
          /////////////////实施
          //主表基本数据
          // this.implementation.projectManageArchives=projectManageArchives
          //里程碑明细
          this.implementation.listOfMapData = projectManageArchives.ipInfo.planList;
          this.implementation.getLoding();
          ////////////////开发
          this.development.listOfMapData = projectManageArchives.deInfo.planList;
          this.development.getLoding();
          ////////////////服务
          this.serviceta.listOfMapData = projectManageArchives.seInfo.planList;
          this.serviceta.getLoding();
          resolve();
        }
      });
    });
  }

  /**
   * 获取多选下拉列表中绑定的id数组
   * @param personnels 多选人员id字符
   */
  getPeronnelIds(personnels): any {
    if (personnels) {
      //截取为数组
      let personnelIdList = personnels.split('、');
      return personnelIdList;
    } else {
      return [];
    }
  }
}