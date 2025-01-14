import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient, SettingsService } from '@delon/theme';
import { CustomerService } from 'app/services/basedata/customer.service';
import { DatePipe } from '@angular/common';
import { ContractFile } from 'app/entity/contract-management/contract-file';

@Component({
  selector: 'app-contract-process-view-process-view-essential-information',
  templateUrl: './essential-information.component.html',
})
export class ContractProcessViewProcessViewEssentialInformationComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private settingsService: SettingsService,
    private datePipe:DatePipe
  ) {}

  ngOnInit(): void {
    
  }
  user=this.settingsService.user//当前登录用户信息
  contractFile: ContractFile = {
    standardQuotation: 0,
    transactionAmount: 0,
    discountRate: 0,
    giftAmount: 0,
    cost: 0,
    contractCost: 0,
    contractProfit: 0,
    accountsReceivable: 0,
    performanceCalculationRate: 0,
    received: 0,
    createBy:this.user.realname,
    createTime:this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
  }; //合同对象
  proList: any = []; //项目下拉集合
  businessTypeDictList: any = []; //业务类型集合
  salesStaffList: any = []; //销售人员tree下拉数据
  formatterDollar = (value: number): string => `¥ ${value}`;
  parserDollar = (value: string): string => value.replace('¥ ', '');
  milestoneList: any = []; //里程碑类型
  formatterDollar2 = (value: number): string => `${value}%`;
  parserDollar2 = (value: string): string => value.replace('%', '');

  /**
   * 项目名称下拉款触发事件
   */
  proChange(event) {
    if (!event) {
      this.contractFile.proId = '';
    }
  }

  /**
   * 根据客户获取客户人员数据
   */
  fdCustomerPersonnelList: any = [];
  getLdCustomerPersonnelList() {
    return new Promise(resolve => {
      this.customerService.getContactsByMainId(this.contractFile.fdCustomerId).then(response => {
        this.fdCustomerPersonnelList = response.result;
        resolve();
      });
    });
  }

  /**
   * 客户人员选择事件
   */
  fdCustomerPersonnelChange(event) {
    if (event) {
      this.fdCustomerPersonnelList.forEach(element => {
        if (element.id == event) {
          this.contractFile.fdCustomerPersonnelTel = element.contectTel;
        }
      });
    } else {
      this.contractFile.fdCustomerPersonnelId = '';
      this.contractFile.fdCustomerPersonnelTel = '';
    }
  }

  /**
   * 业务类型选择事件
   */
  businessTypeDictIdChange(event) {
    if (!event) {
      this.contractFile.businessTypeDictId = '';
    }
  }

  /**
   * 销售人员选择时间
   * @param event
   */
  onChangeSalesmanId(event) {
    if (event) {
      //获取人员名称
      this.salesStaffList.forEach(pkOrg => {
        pkOrg.children.forEach(depart => {
          depart.children.forEach(personnel => {
            if (personnel.key === event) {
              this.contractFile.salesmanName = personnel.name;
            }
          });
        });
      });
    } else {
      this.contractFile.salesmanName = '';
    }
  }

  /**
   * 免费售后起始
   */
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    if (this.contractFile.freeAfterSalesEnd) {
      let end = new Date(this.contractFile.freeAfterSalesEnd); //结束时间
      //开始时间大于结束时间的禁用
      return current.getTime() > end.getTime();
    } else {
      return false;
    }
  };

  /**
   * 免费售后截至
   */
  disabledDate2 = (current: Date): boolean => {
    // Can not select days before today and today
    if (this.contractFile.freeAfterSalesStart) {
      let start = new Date(this.contractFile.freeAfterSalesStart); //开始时间
      //结束时间小于开始时间禁用
      return current.getTime() < start.getTime();
    } else {
      return false;
    }
  };

  

  /**
   * 成交金额改变事件
   */
  transactionAmountBlur() {
    //计算折扣率
    this.calculation();
    //计算应收金额
    this.calculationAccountsReceivable();
  }

  /**
   * 计算折扣率
   */
  calculation() {
    /**计算折扣率*/
    //标准报价
    let standardQuotation = this.getIsNaN('standardQuotation');
    //成交金额
    let transactionAmount = this.getIsNaN('transactionAmount');
    //折扣率
    if (transactionAmount > 0.0 && standardQuotation > 0.0) {
      //（成交金额/标准报价）100
      let discountRate = Number(((transactionAmount / standardQuotation) * 100).toFixed(2));
      this.contractFile.discountRate = discountRate;
    }
    //计算合同利润
    this.calculationContractProfit();
  }

  /**
   * 成本改变事件
   */
  costBlur() {
    //计算合同利润
    this.calculationContractProfit();
  }

  /**
   * 合同费用改变事件
   */
  contractCostBlur() {
    //计算合同利润
    this.calculationContractProfit();
  }

  /**
   * 计算合同利润
   */
  calculationContractProfit() {
    //成交金额
    let transactionAmount = this.getIsNaN('transactionAmount');
    //成本
    let cost = this.getIsNaN('cost');
    //合同费用
    let contractCost = this.getIsNaN('contractCost');
    //合同利润
    if (transactionAmount > 0.0) {
      //成交金额-成本-合同费用
      let contractProfit = transactionAmount - cost - contractCost;
      this.contractFile.contractProfit = contractProfit;
    }
  }

  /**
   * 计算应收款账
   */
  calculationAccountsReceivable(){
    //成交金额
    let transactionAmount = this.getIsNaN('transactionAmount');
    //回款金额
    let received=this.getIsNaN("received");
    //计算应收金额
    if(transactionAmount>0.0){
      //成交金额-回款金额
      this.contractFile.accountsReceivable=transactionAmount-received;
    }
  }


  /**
   * 验证是否数字
   */
  getIsNaN(name) {
    if (!isNaN(Number(this.contractFile[name]))) {
      return Number(this.contractFile[name]);
    } else {
      return 0.0;
    }
  }

  close() {}
}
