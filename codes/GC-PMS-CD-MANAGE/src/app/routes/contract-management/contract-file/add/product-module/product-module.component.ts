import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzModalRef, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ContractFileProduct } from 'app/entity/contract-management/contract-file-product';
import { ContractFileModular } from 'app/entity/contract-management/contract-file-modular';
import { ContractFile } from 'app/entity/contract-management/contract-file';
import { RoutesSharedModalProdutSelectComponent } from 'app/routes/shared/modal/produt-select/produt-select.component';
import { ContractFileModularService } from 'app/services/contract-management/contract-file-modular.service';
import { BaseMaterialFileModular } from 'app/entity/basedata/base-material-file-modular';
import { BaseMaterialFileModularService } from 'app/services/basedata/base-material-file-modular.service';

@Component({
  selector: 'app-contract-management-contract-file-add-product-module',
  templateUrl: './product-module.component.html',
})
export class ContractManagementContractFileAddProductModuleComponent implements OnInit {
  constructor(
    private modalService:NzModalService,
    private baseMaterialFileModularService:BaseMaterialFileModularService
  ) {}
  ngOnInit(): void {}

  productList: ContractFileProduct[] = []; //产品数据
  // moduleList:ContractFileModular[]=[];//模块数据
  formatterDollar = (value: number): string => `¥ ${value}`;
  parserDollar = (value: string): string => value.replace('¥ ', '');
  formatterDollar2 = (value: number): string => `${value}%`;
  parserDollar2 = (value: string): string => value.replace('%', '');

  /**
   * 产品新增行
   */
  prouctI = 0;
  productAddRow() {
    this.productList = [
      ...this.productList,
      {
        id: `${this.prouctI}`,
        code: '',
        name: '',
        discountRate: 0,
        standardQuotation: 0,
        unitPriceAfterDiscount: 0,
        standardAmount: 0,
        amountAfterDiscount: 0,
        costUnitPrice: 0,
        costAmount: 0,
        contractFileModularList: [],
      },
    ];
    this.prouctI++;
  }

  /**
   * 产品删除行
   */
  productDeleteRow(data) {
    this.productList = this.productList.filter(d => d.id !== data.id);
    //计算折扣单价总和
    this.getUnitPriceAfterDiscountTotal();
    //计算标准报价
    this.standardQuotationModuleKeyUp(data)
  }

  /**
   * 模块新增行
   */
  moduleI = 0;
  moduleAddRow(product) {
    product.contractFileModularList = [
      ...product.contractFileModularList,
      {
        id: `${this.moduleI}`,
        code: '',
        name: '',
        standardQuotation: 0,
        purchasePrice: 0,
      },
    ];
    this.moduleI++;
  }

  /**
   * 模块删除行
   */
  moduleDeleteRow(product, id) {
    product.contractFileModularList = product.contractFileModularList.filter(d => d.id !== id);
    //计算标准报价
    this.standardQuotationModuleKeyUp(product)
  }

  /**
   * 模块标准报价键盘弹起事件
   * @param product 产品对象
   */
  standardQuotationModuleKeyUp(product) {
    //判断当前产品下是否存在模块
    if (product && product.contractFileModularList) {
      let standardQuotationTotal = 0.0; //定义模块中标准报价总计
      //循环模块
      product.contractFileModularList.forEach(element => {
        //判断标准报价是否为数字
        if (!isNaN(Number(element.standardQuotation))) {
          //累加
          standardQuotationTotal = standardQuotationTotal + Number(element.standardQuotation);
        }
      });
      //把模块标准报价总和赋值给产品的标准报价
      product.standardQuotation = standardQuotationTotal;
      //获取品总标准报价并传入基本信息
      this.getContractFileStandardQuotationTotal();
    }
  }

  /**
   * 获取合同总共的标准报价
   */

  getContractFileStandardQuotationTotal() {
    if (this.productList) {
      let standardQuotationProductTotal = 0.0; //定义产品中标准报价总计
      this.productList.forEach(element => {
        //判断标准报价是否为数字
        if (!isNaN(Number(element.standardQuotation))) {
          //累加
          standardQuotationProductTotal = standardQuotationProductTotal + Number(element.standardQuotation);
        }
      });
      //把产品的总标准报价给合同标准报价
      this.contractFile.standardQuotation = standardQuotationProductTotal;
      //传给基本信息
      this.outContractFileObject();
    }
  }

  contractFile: ContractFile = {}; //合同的对象
  /**
   * 获取当前页面的相关信息传个父级页面
   */
  @Output() contractFileObject = new EventEmitter<{}>();
  outContractFileObject() {
    this.contractFileObject.emit(this.contractFile);
  }

  /**
   * 选择产品事件
   */
  selectProdutModal(product) {
    const modalRef = this.modalService.create({
      nzTitle: '选择产品',
      nzContent: RoutesSharedModalProdutSelectComponent,
      nzWidth: 1400,
      nzFooter: [
        {
          label: '关闭',
          type: 'default',
          onClick: addModel => {
            addModel.close();
          },
        },
        {
          label: '确定',
          type: 'primary',
          onClick: addModel => {
            addModel.save().then(()=>{
              product.code=addModel.selectObj[0].code
              product.name=addModel.selectObj[0].name
              product.baseMaterialFileProductId=addModel.selectObj[0].id
              //获取产品下的模块数据下拉供模块表格选择
              this.getModuleListByPid(product);
            });
          },
        },
      ],
    });
  }

  /**
   * 根据产品id查询所属模块集合(供模块表格下拉选择)
   */
  getModuleListByPid(product){
      return new Promise((resolve)=>{
        let baseMaterialFileModular=new BaseMaterialFileModular();
        baseMaterialFileModular.baseMaterialFileProductId=product.baseMaterialFileProductId;
        //查询当前选择产品的模块
        this.baseMaterialFileModularService.list(baseMaterialFileModular).then((response)=>{
          //放入产品对象中
          if(response.success){
            product.modularListSelect=JSON.parse(JSON.stringify(response.result.records))
          }
          resolve();
        })
      })
  }

  /**
   * 模块选择触发事件
   * 获取编码和名称
   */
  baseMaterialFileModularIdChange(product,data,event){
    if(event){
      product.modularListSelect.forEach(element => {
        if(event==element.id){
          data.code=element.code;
          data.name=element.name;
          data.standardQuotation=element.standardQuotation;
        }
      });
    }else{
      data.code="";
      data.name="";
    }
    //计算标准报价
    this.standardQuotationModuleKeyUp(product)
  }

  /**
   * 折扣后单价改变事件
   */
  unitPriceAfterDiscountBlur(data){
    //标准报价
    let standardQuotation=this.getIsNaN("standardQuotation",data);
    //折扣后单价
    let unitPriceAfterDiscount=this.getIsNaN("unitPriceAfterDiscount",data);
    //折扣率
    if (unitPriceAfterDiscount > 0.0 && standardQuotation > 0.0) {
      //（成交金额/标准报价）100
      let discountRate = Number(((unitPriceAfterDiscount / standardQuotation) * 100).toFixed(2));
      data.discountRate = discountRate;
    }
    //计算折扣单价总和
    this.getUnitPriceAfterDiscountTotal();
  }

/**
 * 计算折扣单价总和
 */
  getUnitPriceAfterDiscountTotal(){
    //折扣后单价总和
    let unitPriceAfterDiscountTotal=0.0;
    if(this.productList){
      this.productList.forEach(element => {
        unitPriceAfterDiscountTotal=unitPriceAfterDiscountTotal+Number(element.unitPriceAfterDiscount);
      });
      //放到主对象中
      this.contractFile.transactionAmount=unitPriceAfterDiscountTotal;
      //传给父级页面
      this.outContractFileObject();
    }
  }

  /**
   * 验证是否数字
   */
  getIsNaN(name,data) {
    if (!isNaN(Number(data[name]))) {
      return Number(data[name]);
    } else {
      return 0.0;
    }
  }
  close() {}
}
