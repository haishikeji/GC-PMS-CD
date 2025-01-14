import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ContractManagementContractFileUpdateEssentialInformationComponent } from './essential-information/essential-information.component';
import { ContractManagementContractFileUpdateProductModuleComponent } from './product-module/product-module.component';
import { ContractManagementContractFileUpdateCollectionPlanComponent } from './collection-plan/collection-plan.component';
import { BaseArchivesProjectApprovalService } from 'app/services/basedata/base-archives-project-approval.service';
import { DictService } from 'app/services/dict.service';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { BaseArchivesCollectionLineService } from 'app/services/basedata/base-archives-collection-line.service';
import { BaseArchivesMilestoneService } from 'app/services/basedata/base-archives-milestone.service';
import { ContractFileService } from 'app/services/contract-management/contract-file.service';
import { I18NService } from '@core';
import { DatePipe } from '@angular/common';
import { BaseArchivesProjectApproval } from 'app/entity/basedata/base-archives-project-approval';
import { recursiveQuery } from '@shared';
import { ContractFile } from 'app/entity/contract-management/contract-file';
import { BaseArchivesCollectionLine } from 'app/entity/basedata/base-archives-collection-line';
import { BaseArchivesMilestone } from 'app/entity/basedata/base-archives-milestone';

@Component({
  selector: 'app-contract-management-contract-file-update',
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
export class ContractManagementContractFileUpdateComponent implements OnInit {
  constructor(
    private baseArchivesProjectApprovalService: BaseArchivesProjectApprovalService,
    private dictService: DictService,
    private personnelService: PersonnelService,
    private baseArchivesCollectionLineService: BaseArchivesCollectionLineService,
    private baseArchivesMilestoneService: BaseArchivesMilestoneService,
    private drawerRef: NzDrawerRef,
    private contractFileService: ContractFileService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.getDictList()
      .then(() => {
        return this.getProList();
      })
      .then(() => {
        return this.getSalesStaffTree();
      })
      .then(() => {
        //计划类型
        return this.getPlanType();
      })
      .then(() => {
        //里程碑
        this.getById();
      });
  }

  //基本信息组件
  @ViewChild('essentialInformation')
  essentialInformation: ContractManagementContractFileUpdateEssentialInformationComponent;
  //产品与模块组件
  @ViewChild('productModule')
  productModule: ContractManagementContractFileUpdateProductModuleComponent;
  //收款计划
  @ViewChild('collectionPlan')
  collectionPlan: ContractManagementContractFileUpdateCollectionPlanComponent;

  id = '';
  /**
   * 根据id查询
   */
  getById() {
    return new Promise(resolve => {
      this.contractFileService.queryMainAndChildById(this.id).then(response => {
        if (response.success) {
          let contractFile = JSON.parse(JSON.stringify(response.result));
          //合同基本信息
          this.essentialInformation.contractFile = contractFile;
          //客户联系人下拉
          this.essentialInformation.getLdCustomerPersonnelList();
          //产品数据
          if (contractFile.contractFileProductList) {
            this.productModule.productList = contractFile.contractFileProductList;
            //获取产品子表的最后排序
            // this.productModule.prouctI = contractFile.contractFileProductList.length + 1;
            //获取模块子表的最后排序
            // let moduleI = 0;
            contractFile.contractFileProductList.forEach(prod => {
              // if (prod.contractFileModularList) {
              //   prod.contractFileModularList.forEach(element => {
              //     moduleI++;
              //   });
              // }
              //获取模块下拉
              this.productModule.getModuleListByPid(prod)
            });
            // this.productModule.moduleI = moduleI;
          }
          //收款计划数据
          if (contractFile.contractFileAndBusinessList) {
            let collectionPlanList = []; //收款计划
            let paymentCollectionList = []; //回款计划
            let collectionPlanSort=0
            let paymentCollectionSort=0
            contractFile.contractFileAndBusinessList.forEach(element => {
              if (element.planType == '1') {
                element.sort=collectionPlanSort;
                collectionPlanList.push(element);
                collectionPlanSort++;
              }
              if (element.planType == '2') {
                element.sort=paymentCollectionSort
                paymentCollectionList.push(element);
                paymentCollectionSort++;
              }
            });
            this.collectionPlan.collectionPlanList=collectionPlanList
            this.collectionPlan.paymentCollectionList=paymentCollectionList
            this.collectionPlan.collectionPlanSort=collectionPlanSort;
            this.collectionPlan.paymentCollectionSort=paymentCollectionSort;
          }
          resolve();
        }
      });
    });
  }
  /**
   * 查询项目立项
   */
  getProList() {
    return new Promise(resolve => {
      let baseArchivesProjectApproval = new BaseArchivesProjectApproval();
      baseArchivesProjectApproval.pkOrg = sessionStorage.getItem('pkOrg');
      this.baseArchivesProjectApprovalService.getTreeList(baseArchivesProjectApproval).then(response => {
        this.essentialInformation.proList = JSON.parse(JSON.stringify(response.result));
        resolve();
      });
    });
  }

  /**
   * 获取数据字典数据
   */
  getDictList() {
    return new Promise(resolve => {
      this.dictService.getByDictCode('business_type').then(response => {
        this.essentialInformation.businessTypeDictList = JSON.parse(JSON.stringify(response.result));
        //里程碑类型
        this.dictService.getByDictCode('base_archives_milestone_type').then(response => {
          this.essentialInformation.milestoneList = response.result;
          resolve();
        });
      });
    });
  }

  /**
   * 获取销售人员下拉
   */
  getSalesStaffTree() {
    return new Promise(resolve => {
      this.personnelService.queryApprover(sessionStorage.getItem('pkOrg')).then(res => {
        this.essentialInformation.salesStaffList = JSON.parse(JSON.stringify(res.result));
        recursiveQuery(this.essentialInformation.salesStaffList);
        resolve();
      });
    });
  }

  /**
   * 产品与模块改变数据传值到其他页面
   */
  contractFileObject(contractFile: ContractFile) {
    if (contractFile.standardQuotation) {
      //产品中计算的标准报价总和传入基本信息标准报价
      this.essentialInformation.contractFile.standardQuotation = contractFile.standardQuotation;
      //计算折扣率
      this.essentialInformation.calculation();
    }
    if (contractFile.transactionAmount) {
      //产品中计算的折扣后单价总和传入基本信息成交金额
      this.essentialInformation.contractFile.transactionAmount = contractFile.transactionAmount;
      //触发成交金额的改变事件计算
      this.essentialInformation.transactionAmountBlur();
    }
  }

  /**
   * 计划类型查询
   */
  getPlanType() {
    return new Promise(resolve => {
      let baseArchivesCollectionLine = new BaseArchivesCollectionLine();
      baseArchivesCollectionLine.pageSize = 20000;
      baseArchivesCollectionLine.pkOrg = sessionStorage.getItem('pkOrg');
      this.baseArchivesCollectionLineService.getList(baseArchivesCollectionLine).then(response => {
        if (response.success) {
          //计划类型
          this.collectionPlan.planList = response.result.records;
        }
        resolve();
      });
    });
  }

  /**
   * 根据里程碑类型查询收款计划的里程碑下拉数据
   */
  milestone(event: ContractFile) {
    //商务里程碑下拉数据
    //查询条件
    let baseArchivesMilestone = new BaseArchivesMilestone();
    baseArchivesMilestone.parentId = '0';
    baseArchivesMilestone.typeId = event.milestoneId; //里程碑档案类型
    //查询数据
    this.baseArchivesMilestoneService.getAllParent(baseArchivesMilestone).then(response => {
      if (response.result) {
        this.collectionPlan.milestoneList = JSON.parse(JSON.stringify(response.result));
      }
    });
  }

  isLoadingSave = false; //保存按钮加载属性
  save() {
    return new Promise(resolve => {
      if (this.essentialInformation.submitForm()) {
        this.isLoadingSave = true;
        let contractFile = new ContractFile();
        contractFile = JSON.parse(JSON.stringify(this.essentialInformation.contractFile)); //获取基本信息的合同对象
        //时间处理
        contractFile.freeAfterSalesStart = this.datePipe.transform(contractFile.freeAfterSalesStart, 'yyyy-MM-dd');
        contractFile.freeAfterSalesEnd = this.datePipe.transform(contractFile.freeAfterSalesEnd, 'yyyy-MM-dd');
        contractFile.contractDate = this.datePipe.transform(contractFile.contractDate, 'yyyy-MM-dd');
        contractFile.pkOrg = sessionStorage.getItem('pkOrg'); //组织id
        contractFile.contractFileProductList = this.productModule.productList; //产品以及模块数据
        //收款计划与回款计划
        let contractFileAndBusinessList = this.collectionPlan.collectionPlanList.concat(
          this.collectionPlan.paymentCollectionList,
        );
        contractFile.contractFileAndBusinessList = contractFileAndBusinessList;
        this.contractFileService.updateMainAndChild(contractFile).then(response => {
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

  close() {
    this.drawerRef.close();
  }
}
