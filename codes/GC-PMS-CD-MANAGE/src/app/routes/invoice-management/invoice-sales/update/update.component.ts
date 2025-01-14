import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient, SettingsService } from '@delon/theme';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProjectManageArchivesService } from 'app/services/project-manage-archives/project-manage-archives.service';
import { BaseArchivesCollectionLineService } from 'app/services/basedata/base-archives-collection-line.service';
import { InvoiceManagePurchaseService } from 'app/services/invoice-management/invoice-manage-purchase.service';
import { I18NService } from '@core';
import { InvoiceManagePurchase } from 'app/entity/invoice-management/invoice-manage-purchase';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';

@Component({
  selector: 'app-invoice-management-invoice-sales-update',
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
export class InvoiceManagementInvoiceSalesUpdateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private datePipe: DatePipe,
    private projectManageArchivesService: ProjectManageArchivesService,
    private baseArchivesCollectionLineService: BaseArchivesCollectionLineService,
    private nzNotificationService: NzNotificationService,
    private drawerRef: NzDrawerRef,
    private invoiceManagePurchaseService: InvoiceManagePurchaseService,
    private i18NService: I18NService,
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      proArchivesId: [null, [Validators.required]],
    });

    //项目下拉数据
    this.isLoadingSave = true;

    this.queryById()
      .then(() => {
        //根据id查询
        return this.getProList();
      })
      .then(() => {
        this.isLoadingSave = false;
      });
  }
  validateForm!: FormGroup;
  invoiceManagePurchase: InvoiceManagePurchase = {}; //对象
  isLoadingSave = false;
  proList = []; //项目下拉数据
  itemDataList = []; //明细表格数据集合
  coArchivesList = []; //条线档案数据集合
  id = '';

  queryById() {
    return new Promise(resolve => {
      this.invoiceManagePurchaseService.queryById(this.id).then(response => {
        if (response.success) {
          this.invoiceManagePurchase = response.result; //主表
          this.itemDataList = response.result.detailList; //子表数据
          //获取里程碑下拉数据
          this.itemDataList.forEach(element => {
            this.coArchivesChange(element);
            //获取用来计算的未收票金额
            element.uncoPriceMax = JSON.parse(JSON.stringify(element.uncoPrice));
            //获取用来计算的第一次已开票金额
            element.oneCoPrice = JSON.parse(JSON.stringify(element.coPrice));
          });
          if (this.itemDataList) {
            //获取最大排序
            this.sort = this.itemDataList.length + 1;
          }
          resolve();
        } else {
          resolve();
        }
      });
    });
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
   * 获取条线下拉数据
   */
  // getCoArchivesList() {
  //   return new Promise(resolve => {
  //     let baseArchivesCollectionLine = new BaseArchivesCollectionLine();
  //     baseArchivesCollectionLine.pageSize = 20000;
  //     baseArchivesCollectionLine.pkOrg = sessionStorage.getItem('pkOrg');
  //     this.baseArchivesCollectionLineService.getList(baseArchivesCollectionLine).then(response => {
  //       if (response.result.records) {
  //         this.coArchivesList = response.result.records;
  //       }
  //       resolve();
  //     });
  //   });
  // }

  /**
   * 项目下拉选择事件
   */
  proChange(event) {
    if (event) {
      //根据id获取项目档案数据
      this.projectManageArchivesService.getListById(event).then(response => {
        if (response.success) {
          let project = JSON.parse(JSON.stringify(response.result)); //项目档案对象
          this.invoiceManagePurchase.proCode = project.proCode; //项目档案编码
          this.invoiceManagePurchase.proName = project.proName; //项目档案名称
          //获取首付款条线
          this.getLineList();
        }
      });
    }
  }

  //获取条线下拉数据
  getLineList() {
    //查询条件
    let projectManageArchives = { proArchivesId: this.invoiceManagePurchase.proArchivesId, planType: '1' };
    this.projectManageArchivesService.getLineList(projectManageArchives).then(response => {
      if (response.success) {
        this.coArchivesList = response.result;
      }
    });
  }

  /**
   * 条线下拉选择事件
   * 获取名称和里程碑下拉数据
   */
  coArchivesChange(data) {
    if (data.coArchivesId) {
      //获取条线名称
      this.coArchivesList.forEach(element => {
        if (data.coArchivesId === element.id) {
          data.coArchivesName = element.planName;
        }
      });
      //获取里程碑下拉数据
      let where = { businessId: data.coArchivesId };
      this.projectManageArchivesService.getMileNameById(where).then(response => {
        if (response.success) {
          data.proBusinessList = response.result;
          //一般用于选择完里程碑又反过来选条线 则重新获取金额
          if (data.proBusinessId) {
            this.proBusinessChange(data);
          }
        }
      });
    }
  }

  /**
   *
   * 获取名称和金额
   */
  uncoPrice = 0; //未收票金额
  proBusinessChange(data) {
    if (data.proBusinessId) {
      data.proBusinessList.forEach(element => {
        if (element.mileId === data.proBusinessId) {
          data.proArchivesMilestone = element.mileName; //名称
          data.price = element.price; //金额
        }
      });
    }
  }

  /**
   * 里程碑选择事件
   */
  proBusinessIdChange(data) {
    if (data.proBusinessId) {
      this.proBusinessChange(data);
      //查询条件
      let where = { coArchivesId: data.coArchivesId, proBusinessId: data.proBusinessId };
      //获取未开票金额
      this.invoiceManagePurchaseService.getChildrenList(where).then(response => {
        if (response.success) {
          if (response.result.uncoPrice) {
            data.uncoPrice = response.result.uncoPrice; //未收票金额
            data.uncoPriceMax = Number(response.result.uncoPrice); //未收票金额
          } else {
            data.uncoPrice = JSON.parse(JSON.stringify(data.price)); //未收票金额
            data.uncoPriceMax = Number(JSON.parse(JSON.stringify(data.price))); //未收票金额
          }
        }
      });
    }
  }

  /**
   * 收票输入事件
   */
  coPriceKeyUp(data) {
    if (data.coPrice) {
      if (data.id) {
        //未开票金额减(当前输入的减第一次已开票金额）
        data.uncoPrice = data.uncoPriceMax - (Number(data.coPrice) - Number(data.oneCoPrice));
      }else{
        //未开票金额减已开票金额
        data.uncoPrice=data.uncoPriceMax-Number(data.coPrice);
      }
    }
  }

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
  }

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
   * 提交保存按钮
   */
  submitForm(): any {
    return new Promise(resolve => {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      let valid = this.validateForm.valid;
      if (valid) {
        this.isLoadingSave = true;
        this.invoiceManagePurchase.type = '2'; //销售
        this.invoiceManagePurchase.pkOrg = sessionStorage.getItem('pkOrg');
        //子表保存数据处理
        if (this.itemDataList && this.itemDataList.length > 0) {
        } else {
          //是否填写明细数据
          this.nzNotificationService.warning('填写明细数据', '');
          this.isLoadingSave = false;
          return;
        }
        this.invoiceManagePurchase.detailList = this.itemDataList;
        this.invoiceManagePurchaseService.update(this.invoiceManagePurchase).then(response => {
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
