import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';
import { BaseArchivesProjectApproval } from 'app/entity/basedata/base-archives-project-approval';
import { BaseArchivesProjectApprovalService } from 'app/services/basedata/base-archives-project-approval.service';
import { Customer } from 'app/entity/basedata/customer';
import { CustomerService } from 'app/services/basedata/customer.service';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { recursiveQuery } from '@shared/utils/yuan copy';
import { ContractFile } from 'app/entity/contract-management/contract-file';
import { ContractFileService } from 'app/services/contract-management/contract-file.service';

@Component({
  selector: 'app-project-manage-archives-add-essential-information',
  templateUrl: './essential-information.component.html',
})
export class ProjectManageArchivesAddEssentialInformationComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private baseArchivesProjectApprovalService: BaseArchivesProjectApprovalService,
    private customerService: CustomerService,
    private personnelService: PersonnelService,
    private contractFileService: ContractFileService,
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      contractFileId: [null, [Validators.required]],
      cusId: [null, [Validators.required]],
      totalPrice: [null, [Validators.required]],
      saleManagerId: [null],
      saleManIds: [null],
      impManagerId: [null],
      impConsultantIds: [null],
      deManagerId: [null],
      deEngineerIds: [null],
      seManagerId: [null],
      seEngineerIds: [null],
      milestoneId: [null, [Validators.required]],
    });
    this.getProList();
    this.getCusList();
    this.getPersonnelList();
  }

  validateForm!: FormGroup;
  projectManageArchivesa: ProjectManageArchives = {
    totalPrice: 0,
    impConsultantList: [],
    deEngineerList: [],
    seEngineerList: [],
  }; //项目档案主表对象
  proList: any = []; //项目立项档案数据集合
  cusList = []; //客户档案数据集合
  //金额格式化
  formatterDollar = (value: number) => {
    if (value) {
      return `$ ${value}`;
    } else {
      return `$ `;
    }
  };
  parserDollar = (value: string) => value.replace('$ ', '');
  saleManIds = []; //业务员id绑定
  personnelList = []; //人员下拉数据
  impConsultantIds = []; //实施顾问下拉选择绑定
  deEngineerIds = []; //开发工程师下拉选择绑定
  seEngineerIds = []; //服务工程师下拉选择绑定
  milestoneList = []; //里程碑类型下拉数据

  /**
   * 查询项目立项
   */
  getProList() {
    // return new Promise(resolve => {
    //   let baseArchivesProjectApproval = new BaseArchivesProjectApproval();
    //   baseArchivesProjectApproval.pkOrg = sessionStorage.getItem('pkOrg');
    //   this.baseArchivesProjectApprovalService.getTreeList(baseArchivesProjectApproval).then(response => {
    //     this.proList = response.result;
    //     resolve();
    //   });
    // });
    return new Promise(resolve => {
      let contractFile = new ContractFile();
      contractFile.pkOrg = sessionStorage.getItem('pkOrg');
      contractFile.pageSize = 20000;
      this.contractFileService.getPageList(contractFile).then(response => {
        this.proList = response.result.records;
        resolve();
      });
    });
  }

  @Output() businessAffairsPamars = new EventEmitter<{}>();
  businessAffairs = {
    collectionPlanList: [],
    paymentCollectionList: [],
    collectionPlanSort: 1,
    paymentCollectionSort: 1,
  };
  contractFileIdChange(event) {
    if (event) {
      this.contractFileService.getContractFileById(event).then(response => {
        let contractFile = JSON.parse(JSON.stringify(response.result));
        this.projectManageArchivesa.proId = contractFile.proId;
        this.projectManageArchivesa.proCode = contractFile.proCode;
        this.projectManageArchivesa.proName = contractFile.proName;
        this.projectManageArchivesa.cusId = contractFile.fdCustomerId;
        this.projectManageArchivesa.cusCode = contractFile.fdCustomerCode;
        this.projectManageArchivesa.cusName = contractFile.fdCustomerName;
        this.projectManageArchivesa.milestoneId = contractFile.milestoneId;
        this.projectManageArchivesa.milestoneType = contractFile.milestoneName;
        this.projectManageArchivesa.totalPrice = contractFile.transactionAmount;
        //收款计划数据
        let collectionPlanList = []; //收款计划
        let paymentCollectionList = []; //回款计划
        let collectionPlanSort = 0;
        let paymentCollectionSort = 0;
        //获取
        if (contractFile.contractFileAndBusinessList) {
          contractFile.contractFileAndBusinessList.forEach(element => {
            if (element.planType == '1') {
              element.sort = collectionPlanSort;
              collectionPlanList.push(element);
              collectionPlanSort++;
            }
            if (element.planType == '2') {
              element.sort = paymentCollectionSort;
              paymentCollectionList.push(element);
              paymentCollectionSort++;
            }
          });
        }
        this.businessAffairs = {
          collectionPlanList: collectionPlanList,
          paymentCollectionList: paymentCollectionList,
          collectionPlanSort: collectionPlanSort,
          paymentCollectionSort: paymentCollectionSort,
        };
        this.businessAffairsPamars.emit(this.businessAffairs);
      });
    }
  }

  /**
   * 里程碑类型选择事件
   */
  //回写里程碑类型到其他页签查询明细
  @Output() milestone = new EventEmitter<{}>();
  milestoneChange(event) {
    if (event) {
      this.milestoneList.forEach(element => {
        if (element.value === event) {
          this.projectManageArchivesa.milestoneType = element.text;
        }
      });
      this.milestone.emit(this.projectManageArchivesa);
    }
  }

  /**
   * 项目立项选择事件
   * @param event 立项id
   */
  proChange(event) {
    this.getChild(this.proList, event);
  }

  //递归查找项目名称
  getChild(list, event) {
    list.forEach(element => {
      if (event === element.id) {
        this.projectManageArchivesa.proCode = element.code;
        this.projectManageArchivesa.proName = element.title;
      } else {
        //如果没找到则进入子集查找
        if (element.children && element.children.length > 0) {
          this.getChild(element.children, event);
        }
      }
    });
  }

  /**
   * 客户档案数据
   */
  getCusList() {
    return new Promise(resolve => {
      let customer = new Customer();
      customer.pkOrg = sessionStorage.getItem('pkOrg');
      customer.pageSize = 20000;
      this.customerService.getCustomer1(customer).then(response => {
        this.cusList = response.result.records;
        resolve();
      });
    });
  }

  /**
   * 客户档案选择事件
   */
  cusChange(event) {
    this.cusList.forEach(element => {
      if (event === element.id) {
        this.projectManageArchivesa.cusCode = element.code;
        this.projectManageArchivesa.cusName = element.name;
      }
    });
    this.getProjectManageArchivesa();
  }

  /**
   * 人员下拉查询
   */
  saleManagerList = []; //销售经理下拉数据
  impManagerList = []; //实施经理下拉数据
  deManagerList = []; //开发项目经理数据
  seManagerList = []; //服务项目经理数据
  getPersonnelList() {
    // return new Promise(resolve => {
    //   this.personnelService.queryApprover(sessionStorage.getItem('pkOrg')).then(response => {
    //     this.personnelList = JSON.parse(JSON.stringify(response.result));
    //     this.saleManagerList = JSON.parse(JSON.stringify(response.result));
    //     this.impManagerList = JSON.parse(JSON.stringify(response.result));
    //     this.deManagerList = JSON.parse(JSON.stringify(response.result));
    //     this.seManagerList = JSON.parse(JSON.stringify(response.result));
    //     recursiveQuery(this.personnelList);
    //     recursiveQuery(this.saleManagerList);
    //     recursiveQuery(this.impManagerList);
    //     recursiveQuery(this.deManagerList);
    //     recursiveQuery(this.seManagerList);
    //     resolve();
    //   });
    // });
  }

  /**
   *  经理选择触发事件
   * @param event 经理id
   * @param type 经理类型
   */
  managerChange(event, type) {
    if (event) {
      this.saleManagerList.forEach(pkOrg => {
        pkOrg.children.forEach(depart => {
          depart.children.forEach(personnel => {
            if (personnel.key === event) {
              if (type === '1') {
                //销售经理名称
                this.projectManageArchivesa.saleManager = personnel.name;
              } else if (type === '2') {
                //实施项目经理名称
                this.projectManageArchivesa.impManager = personnel.name;
              } else if (type === '3') {
                //开发项目经理名称
                this.projectManageArchivesa.deManager = personnel.name;
              } else if (type === '4') {
                //服务经理名称
                this.projectManageArchivesa.seManager = personnel.name;
              }
            }
          });
        });
      });
      this.getProjectManageArchivesa(type);
    }
  }

  expandKeys = [];

  /**
   * 人员多选触发事件
   * @param event 人员id
   * @param type 经理类型
   */
  personnelChange(event, type) {
    if (event) {
      let names = '';
      let ids = '';
      let sort = 0;
      //根据下拉数据获取名称
      event.forEach(element => {
        this.saleManagerList.forEach(pkOrg => {
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
                sort++;
              }
            });
          });
        });
      });
      //有数据则正常赋值
      if (sort > 0) {
        if (type === '1') {
          //业务员
          this.projectManageArchivesa.saleManId = ids;
          this.projectManageArchivesa.saleMan = names;
        } else if (type === '2') {
          //实施顾问
          this.projectManageArchivesa.impConsultantId = ids;
          this.projectManageArchivesa.impConsultant = names;
        } else if (type === '3') {
          //开发工程师
          this.projectManageArchivesa.deEngineerId = ids;
          this.projectManageArchivesa.deEngineer = names;
        } else if (type === '4') {
          //服务工程师
          this.projectManageArchivesa.seEngineerId = ids;
          this.projectManageArchivesa.seEngineer = names;
        }
      } else {
        //没数据则清空
        if (type === '1') {
          //业务员
          this.projectManageArchivesa.saleManId = '';
          this.projectManageArchivesa.saleMan = '';
        } else if (type === '2') {
          //实施顾问
          this.projectManageArchivesa.impConsultantId = '';
          this.projectManageArchivesa.impConsultant = '';
        } else if (type === '3') {
          //开发工程师
          this.projectManageArchivesa.deEngineerId = '';
          this.projectManageArchivesa.deEngineer = '';
        } else if (type === '4') {
          //服务工程师
          this.projectManageArchivesa.seEngineerId = '';
          this.projectManageArchivesa.seEngineer = '';
        }
      }
      this.getProjectManageArchivesa(type);
    }
  }

  // //人员选择信息回写到其他页签的执行人
  // @Output() personnelIds = new EventEmitter<{}>();
  // getPersonnelIds(type){
  //   //参数人员ids，类型（2实施、3开发、4服务）
  //   let personnelIds=[];
  //   if(type==='2'){//实施
  //     personnelIds.push(this.projectManageArchivesa.impManagerId);//实施经理
  //     Array.prototype.push.apply(personnelIds, this.impConsultantIds);//实施顾问
  //   }
  //   if(type==='3'){//开发
  //     personnelIds.push(this.projectManageArchivesa.deManagerId);//开发经理
  //     Array.prototype.push.apply(personnelIds, this.deEngineerIds);//开发工程师
  //   }
  //   if(type==='4'){//服务
  //     personnelIds.push(this.projectManageArchivesa.seManagerId);//服务经理
  //     Array.prototype.push.apply(personnelIds, this.seEngineerIds);//服务工程师
  //   }
  //   let per={personnelIds:personnelIds,type:type}
  //   this.personnelIds.emit(per);
  // }

  //基本信息回写到其他页签
  @Output() projectManageArchivesaEntiy = new EventEmitter<{}>();
  getProjectManageArchivesa(type?: any) {
    //获取人员id传到其他页签
    if (type) {
      if (type === '2') {
        //实施
        this.projectManageArchivesa.impConsultantList = [];
        if (this.projectManageArchivesa.impManagerId) {
          this.projectManageArchivesa.impConsultantList.push(this.projectManageArchivesa.impManagerId); //实施经理
        }
        if (this.impConsultantIds && this.impConsultantIds.length > 0) {
          Array.prototype.push.apply(this.projectManageArchivesa.impConsultantList, this.impConsultantIds); //实施顾问
        }
      }
      if (type === '3') {
        //开发
        this.projectManageArchivesa.deEngineerList = [];
        if (this.projectManageArchivesa.deManagerId) {
          this.projectManageArchivesa.deEngineerList.push(this.projectManageArchivesa.deManagerId); //开发经理
        }
        if (this.deEngineerIds && this.deEngineerIds.length > 0) {
          Array.prototype.push.apply(this.projectManageArchivesa.deEngineerList, this.deEngineerIds); //开发工程师
        }
      }
      if (type === '4') {
        //服务
        this.projectManageArchivesa.seEngineerList = [];
        if (this.projectManageArchivesa.seManagerId) {
          this.projectManageArchivesa.seEngineerList.push(this.projectManageArchivesa.seManagerId); //服务经理
        }
        if (this.seEngineerIds && this.seEngineerIds.length > 0) {
          Array.prototype.push.apply(this.projectManageArchivesa.seEngineerList, this.seEngineerIds); //服务工程师
        }
      }
    }
    this.projectManageArchivesaEntiy.emit(this.projectManageArchivesa);
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let valid = this.validateForm.valid;
    return valid;
  }
}
