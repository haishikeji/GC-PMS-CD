import { Page } from '../page';
import { ContractFileProduct } from './contract-file-product';
import { ContractFileAndBusiness } from './contract-file-and-business';
/**
 * 合同档案主表基本信息
 */
export class ContractFile extends Page {
    /**主键*/
	 id?:string;
	/**合同日期yyyy-MM-dd*/
	contractDate?:string;
	/**合同编码*/
	 code?:string;
	/**合同概述*/
	 overview?:string;
	/**业务类型（数据字典）*/
	 businessTypeDictId?:string;
	/**客户id(客户档案id)*/
	 fdCustomerId?:string;
	/**客户人员id（客户档案联系人id）*/
	 fdCustomerPersonnelId?:string;
	/**销售部门id*/
	 salesDepartmentId?:string;
	/**销售部门名称*/
	 salesDepartmentName?:string;
	/**免费售后起始yyyy-MM-dd*/
	freeAfterSalesStart?:string;
	/**免费售后截至yyyy-MM-dd*/
	freeAfterSalesEnd?:string;
	/**标准报价*/
	standardQuotation?:number;
	/**成交金额*/
	transactionAmount?:number;
	/**折扣率*/
	discountRate?:number;
	/**赠品金额*/
	giftAmount?:number;
	/**成本*/
	cost?:number;
	/**合同费用*/
	contractCost?:number;
	/**合同利润*/
	contractProfit?:number;
	/**备注*/
	memo?:string;
	/**应收账款*/
	accountsReceivable?:number;
	/**业绩计算率*/
	performanceCalculationRate?:number;
	/**创建时间yyyy-MM-dd HH:mm:ss*/
	createTime?:string;
	/**创建人*/
	 createBy?:string;
	/**修改时间yyyy-MM-dd HH:mm:ss*/
	updateTime?:string;
	/**修改人*/
	 updateBy?:string;
	/**组织*/
	 pkOrg?:string;
	/**里程碑类型id(数据字典)*/
	 milestoneId?:string;
	 /**项目理想id */
	 proId?:string;
	/**销售人员id*/
	salesmanId?:string;
	/**销售人员名称*/
	salesmanName?:string;
	/**汇款金额 */
	received?:number;

	 //显示
	 /**客户编码 */
	 fdCustomerCode?:string;
	 /**客户名称 */
	 fdCustomerName?:string;
	 /**客户人员名称 */
	 fdCustomerPersonnelName?:string;
	 /**客户人员电话 */
	 fdCustomerPersonnelTel?:string;
	 /**客户地址 */
	 fdCustomeraddress?:string;
	 /**项目立项编码 */
	 proCode?:string;
	 /**项目立项名称*/
	proName?:string;
	/**里程碑类型名称*/
	milestoneName?:string;
	/**业务类型名称 */
	businessTypeDictName?:string;

	/**合同产品子表*/
	contractFileProductList?:ContractFileProduct[];

	/**合同收款计划子表*/
	contractFileAndBusinessList?:ContractFileAndBusiness[];
}
