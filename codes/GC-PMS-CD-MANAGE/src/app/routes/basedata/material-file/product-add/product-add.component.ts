import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { Page } from 'app/entity/page'; //分页
import { BaseMaterialFileProduct } from 'app/entity/basedata/base-material-file-product';
import { BaseMaterialFileClassification } from 'app/entity/basedata/base-material-file-classification';
import { BaseMaterialFileClassificationService } from 'app/services/basedata/base-material-file-classification.service';
import { BaseMaterialFileProductService } from 'app/services/basedata/base-material-file-product.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { I18NService } from '@core';
import { NzDrawerRef, NzNotificationService } from 'ng-zorro-antd';
import { messageShared } from '@shared/utils/message';
import { resolveComponentResources } from '@angular/core/src/metadata/resource_loading';
import { BaseMaterialFileModularService } from 'app/services/basedata/base-material-file-modular.service';
import { BaseMaterialFileModular } from 'app/entity/basedata/base-material-file-modular';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-basedata-material-file-product-add',
  templateUrl: './product-add.component.html',
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
        z-index: 99;
      }
    `,
  ],
})
export class BasedataMaterialFileProductAddComponent implements OnInit {
  // 如果想某对象中的值是死数据，在 ngOnInit 中赋值，此处赋值无效！！！！！！！！
  baseMaterialFileClassification: BaseMaterialFileClassification; //物料分类 对象
  baseMaterialFileProduct: BaseMaterialFileProduct = {}; //产品对象
  baseMaterialFileModular: BaseMaterialFileModular = {}; //模块 对象

  isOne = 0; //标题判断
  page: Page = {}; //分页对象
  materialId: string = ''; //接收抽屉的物料id （产品抽屉回显所属物料分类）

  proTable = []; //产品数据
  productPage = {
    total: 0,
    current: 0,
  };
  materialTree: any = []; //物料分类 (树)
  validateForm!: FormGroup;
  modData: any = []; // 模块列表数据

  id: string = ''; //接收抽屉产品 id
  clickProObj: {}; //点击的产品对象
  sort = 1; //默认
  status = true; //默认产品初始状态是启用
  //金额格式化 （标准报价）
  formatterDollar = (value: number) => {
    if (value) {
      return `$ ${value}`;
    } else {
      return `$ `;
    }
  };
  parserDollar = (value: string) => value.replace('$ ', '');

  constructor(
    private baseMaterialFileProductService: BaseMaterialFileProductService,
    private baseMaterialFileClassificationService: BaseMaterialFileClassificationService,
    private baseMaterialFileModularService: BaseMaterialFileModularService,
    private fb: FormBuilder,
    private i18NService: I18NService,
    private notification: NzNotificationService,
    private nzNotificationService: NzNotificationService,
    private nzDrawerRef: NzDrawerRef, //抽屉
  ) {}

  ngOnInit() {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      sort: ['number', [Validators.required]],
      status: [], //不验证
      attribute: [null, [Validators.required]],
      baseMaterialFileClassificationId: [null, [Validators.required]],
    });
    // 修改 对象中某属性的值，在此处赋值 (接收 抽屉的值 物料ID)
    this.baseMaterialFileProduct.baseMaterialFileClassificationId = this.materialId;
    this.getMaterialTree(); //物料 分类  树
    this.getProductList(); //产品 列表

    this.baseMaterialFileProduct.id = this.id; //全局变量点击产品项ID赋值给产品ID
    //根据ID 查询产品
    if (this.baseMaterialFileProduct.id) {
      return new Promise(resolve => {
        this.baseMaterialFileProduct.pkOrg = sessionStorage.getItem('pkOrg');
        this.baseMaterialFileProductService.queryMainAndChildById(this.baseMaterialFileProduct.id).then(res => {
          this.baseMaterialFileProduct = res.result;
          console.log('点击的产品数据', this.baseMaterialFileProduct);
          //回显产品状态
          if (this.baseMaterialFileProduct.status == '0') {
            this.status = false; //未启用
          } else {
            this.status = true;
          }
          this.baseMaterialFileProduct.status = this.baseMaterialFileProduct.status + '';
          if (this.baseMaterialFileProduct.baseMaterialFileModularList) {
            // 以下这种写法，只在该方法中赋值，其他地方相互不影响
            // this.modData =JSON.parse(JSON.stringify(clickProObj.baseMaterialFileModularList))
            this.modData = this.baseMaterialFileProduct.baseMaterialFileModularList; //模块列表
            this.sort = this.modData.length + 1;
          }
          console.log('模块列表', this.baseMaterialFileProduct.baseMaterialFileModularList);
        });
        resolve();
      });
    }
  }

  // 产品 保存（新增/修改）
  proSubForm() {
    if (this.status) {
      //是否启用
      this.baseMaterialFileProduct.status = '1';
    } else {
      this.baseMaterialFileProduct.status = '0';
    }
    //无点击的 ID--->新增
    if (this.id == '') {
      console.log('新增产品', this.baseMaterialFileProduct);
      return new Promise(resolve => {
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
        let valid = this.validateForm.valid;
        if (valid) {
          // console.log('valid有效--->', valid);
          this.baseMaterialFileProduct.pkOrg = sessionStorage.getItem('pkOrg');
          // 保存 模块 数据到对象中
          this.baseMaterialFileProduct.baseMaterialFileModularList = this.modData;
          console.log('新增保存的模块列表', this.baseMaterialFileProduct.baseMaterialFileModularList);
          this.baseMaterialFileProductService.saveMainAndChild(this.baseMaterialFileProduct).then(res => {
            if (res.success) {
              // console.log('out', res);
              this.proTable = res.result;
              console.log('新增的产品对象proTable>>', this.proTable);
              this.getProductList();
              this.nzNotificationService.success(this.i18NService.fanyi('save.ok'), '');
              this.nzDrawerRef.close(true); //关闭抽屉是否刷新列表
            } else {
              this.nzNotificationService.error(this.i18NService.fanyi('save.not'), '');
            }
          });
          resolve();
        }
      });
    } else {
      // 修改
      this.baseMaterialFileProduct.pkOrg = sessionStorage.getItem('pkOrg');
      if (this.modData) {
        this.baseMaterialFileProduct.baseMaterialFileModularList = this.modData;
      }
      return new Promise(resolve => {
        this.baseMaterialFileProductService.updateMainAndChild(this.baseMaterialFileProduct).then(res => {
          if (res.success) {
            this.clickProObj = res.result;
            console.log('this.clickProObj', this.clickProObj);
            console.log('this.baseMaterialFileProduct', this.baseMaterialFileProduct);
            this.notification.success(this.i18NService.fanyi('successful.revision'), '');
            this.getProductList();
            this.nzDrawerRef.close(true); //关闭抽屉是否刷新列表
          } else {
            this.notification.error(
              this.i18NService.fanyi('modification.failed'),
              messageShared(this.i18NService, res.message),
            );
          }
        });
        resolve();
      });
    }
  }
  //查询 物料分类 树
  getMaterialTree() {
    return new Promise(resolve => {
      let baseMaterialFileClassification = new BaseMaterialFileClassification();
      baseMaterialFileClassification.pkOrg = sessionStorage.getItem('pkOrg');
      this.baseMaterialFileClassificationService.getTreeList(baseMaterialFileClassification).then(res => {
        this.materialTree = res.result;
        console.log('物料分类 树', this.materialTree);
        resolve();
      });
    });
  }
  //查询产品 列表
  getProductList() {
    return new Promise(resolve => {
      var page = new Page();
      page.pageSize = 10; //当前页显示的条数
      this.baseMaterialFileProductService.list(page).then(res => {
        this.proTable = res.result.records;
        console.log('查询到的产品数据proTable', this.proTable);
        resolve();
      });
    });
  }

  //模块 新增
  addRowMod() {
    this.modData = [
      ...this.modData,
      {
        id: '',
        code: '',
        name: '',
        standardQuotation: '',
        sort: this.sort,
      },
    ];
    this.sort++;
  }
  // 模块 删除按钮
  deleteMod(data) {
    // console.log('模块数据', this.modData);
    //删除点击项 获取新的模块列表数据
    this.modData = this.modData.filter(d => d.sort !== data.sort);
  }

  //树自带方法
  materialChange() {}
  // 保存
  save(value: any) {
    this.proSubForm();
  }

  //关闭
  close() {
    this.nzDrawerRef.close(false); //关闭抽屉是否刷新列表
  }
}
