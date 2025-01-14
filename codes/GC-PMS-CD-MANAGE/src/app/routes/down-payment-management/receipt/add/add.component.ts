import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerPaymentAndReceiptSlip } from 'app/entity/down-payment-management/manager-payment-and-receipt-slip';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';
import { ProjectManageArchivesService } from 'app/services/project-manage-archives/project-manage-archives.service';
import { ManagerPaymentAndReceiptSlipService } from 'app/services/down-payment-management/manager-payment-and-receipt-slip.service';
import { I18NService } from '@core';
import { InvoiceManagePurchase } from 'app/entity/invoice-management/invoice-manage-purchase';
import { InvoiceManagePurchaseService } from 'app/services/invoice-management/invoice-manage-purchase.service';

@Component({
  selector: 'app-down-payment-management-receipt-add',
  templateUrl: './add.component.html',
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
export class DownPaymentManagementReceiptAddComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private projectManageArchivesService: ProjectManageArchivesService,
    private managerPaymentAndReceiptSlipService: ManagerPaymentAndReceiptSlipService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
    private drawerRef: NzDrawerRef,
    private invoiceManagePurchaseService:InvoiceManagePurchaseService
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      proId: [null, [Validators.required]],
    });
    this.isLoadingSave = true;
    //项目下拉数据
    this.getProList().then(() => {
      this.isLoadingSave = false;
    });
  }

  validateForm!: FormGroup;
  managerPaymentAndReceiptSlip: ManagerPaymentAndReceiptSlip = {}; //对象
  isLoadingSave = false;
  proList = []; //项目下拉数据
  proArchivesList = []; //里程碑下拉数据
  coArchivesList = []; //条线下拉数据
  invoiceIdList = []; //发票数据集合
  //金额格式化
  formatterDollar = (value: number) => {
    if (value) {
      return `$ ${value}`;
    } else {
      return `$ `;
    }
  };
  parserDollar = (value: string) => value.replace('$ ', '');
  
  /**
   * 获取销售发票下拉数据
   */
  getInvoiceIdList(){
    return new Promise((resolve)=>{
      let invoiceManagePurchase=new InvoiceManagePurchase();
      invoiceManagePurchase.pageSize=20000;
      invoiceManagePurchase.type="2";
      invoiceManagePurchase.pkOrg=sessionStorage.getItem("pkOrg");
      invoiceManagePurchase.proArchivesId=this.managerPaymentAndReceiptSlip.proId;//项目id
      this.invoiceManagePurchaseService.getList(invoiceManagePurchase).then((response)=>{
        if(response.success){
          this.invoiceIdList=response.result.records
        }
        resolve();
      })
    })
  }

  /**
   * 获取项目下拉数据
   */
  getProList() {
    return new Promise(resolve => {
      let projectManageArchives = new ProjectManageArchives();
      projectManageArchives.pageSize = 20000;
      projectManageArchives.pkOrg = sessionStorage.getItem('pkOrg');
      this.projectManageArchivesService.getList(projectManageArchives).then(response => {
        if (response.result.records) {
          this.proList = response.result.records;
        }
        resolve();
      });
    });
  }

  /**
   * 项目下拉选择事件
   */
  proChange(event) {
    if (event) {
      //根据id获取项目档案数据
      this.projectManageArchivesService.getListById(event).then(response => {
        if (response.success) {
          let project = JSON.parse(JSON.stringify(response.result)); //项目档案对象
          this.managerPaymentAndReceiptSlip.proCode = project.proCode; //项目档案编码
          this.managerPaymentAndReceiptSlip.proName = project.proName; //项目档案名称
          this.managerPaymentAndReceiptSlip.cusId = project.cusId; //客户id
          this.managerPaymentAndReceiptSlip.cusCode = project.cusCode; //客户编码
          this.managerPaymentAndReceiptSlip.cusName = project.cusName; //客户名称
          //获取条线下拉数据
          this.getLineList();
          //获取发票下拉数据
          this.getInvoiceIdList()
        }
      });
    }
  }

  //获取条线下拉数据
  getLineList() {
    //查询条件
    let projectManageArchives = { proArchivesId: this.managerPaymentAndReceiptSlip.proId, planType: '2' };
    this.projectManageArchivesService.getLineList(projectManageArchives).then(response => {
      if (response.success) {
        this.coArchivesList = response.result;
      }
    });
  }

  /**
   * 条件选择事件
   * 获取条线名称、获取里程碑数据
   */
  coArchivesIdChange(data) {
    if (data.coArchivesId) {
      //获取条线名称
      this.coArchivesList.forEach(element => {
        if (data.coArchivesId === element.id) {
          data.coArchivesName = element.planName;
        }
      });
      // //获取里程碑下拉数据
      this.getMilList(data);
    }
  }

  /**
   * 获取里程碑下拉数据
   */
  getMilList(data) {
    //获取里程碑下拉数据
    let where = { businessId: data.coArchivesId };
    this.projectManageArchivesService.getMileNameById(where).then(response => {
      if (response.success) {
        data.proArchivesIdList = response.result;
        //一般用于选择完里程碑又反过来选条线 则重新获取金额
        if(data.proArchivesId){
          this.proBusinessChange(data);
        }
      }
    });
  }

  /**
   * 里程碑选择事件
   */
  proBusinessChange(data) {
    if (data.proArchivesId) {
      data.proArchivesIdList.forEach(element => {
        if (element.mileId === data.proArchivesId) {
          data.proArchivesMilestone = element.mileName; //名称
          data.coPrvice = element.price; //金额
        }
      });
      //计算总金额
    this.getCoPrviceTotal();
    }
  }

  itemDataList = []; //子表明细集合
  /**
   * 增行按钮
   */
  sort = 0;
  addRow() {
    this.itemDataList = [
      ...this.itemDataList,
      {
        price: '',
        uncoPrice: '',
        coPrice: '',
        sort: this.sort,
      },
    ];
    this.sort++;
  }

  /**
   * 删除行
   */
  deleteRow(sort) {
    this.itemDataList = this.itemDataList.filter(d => d.sort !== sort);
    //计算总金额
    this.getCoPrviceTotal();
  }

  /**
   * 金额填写事件
   */
  coPrviceKeyUp() {
    //计算总金额
    this.getCoPrviceTotal();
  }

  /**
   * 获取收款金额合计
   */
  getCoPrviceTotal() {
    //判断是否有值
    if (!this.itemDataList) {
      return;
    }
    //获取所有金额总计
    let coPrviceTotal = 0;
    this.itemDataList.forEach(element => {
      if (element.coPrvice && !isNaN(Number(element.coPrvice))) {
        coPrviceTotal = coPrviceTotal + Number(element.coPrvice);
      }
    });
    this.managerPaymentAndReceiptSlip.totalPrice = coPrviceTotal;
  }

  /**
   * 保存提交
   */
  submitForm(): any {
    return new Promise(resolve => {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      let valid = this.validateForm.valid;
      if (valid) {
        this.managerPaymentAndReceiptSlip.type = '1'; //收款表
        this.managerPaymentAndReceiptSlip.pkOrg = sessionStorage.getItem('pkOrg'); //公司组织
        this.managerPaymentAndReceiptSlip.detailList = this.itemDataList;
        //子表数据处理
        if(this.itemDataList&&this.itemDataList.length>0){
          this.itemDataList.forEach(element => {
            //获取发票下拉中选中的名称
            if(element.invoiceId){
              this.invoiceIdList.forEach(invoice => {
                if(invoice.id===element.invoiceId){
                  element.invoice=invoice.billcode;
                }
              });
            }
          });
        }else {
          this.nzNotificationService.warning('明细数据必填', '');
          this.isLoadingSave=false;
          return;
        }
        this.managerPaymentAndReceiptSlipService.add(this.managerPaymentAndReceiptSlip).then(response => {
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
