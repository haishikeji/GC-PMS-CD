import { Page } from '../page';
import { ContractFileModular } from './contract-file-modular';
/**
 * 合同产品
 */
export class ContractFileProduct extends Page {
    /**主键*/
	id?:string;
	/**产品编码*/
	code?:string;
	/**产品名称*/
	name?:string;
	/**物料档案产品id*/
	baseMaterialFileProductId?:string;
	/**标准报价*/
	standardQuotation?:number;
	/**折扣后单价*/
	unitPriceAfterDiscount?:number;
	/**标准金额*/
	standardAmount?:number;
	/**折扣后金额*/
	amountAfterDiscount?:number;
	/**成本单价*/
	costUnitPrice?:number;
	/**成本金额*/
	costAmount?:number;
	/**备注*/
	memo?:string;
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
	/**排序*/
	sort?:number;
	/**主表id*/
	contractFileId?:string;
	/**折扣率 */
	discountRate?:number;
	/**合同产品模块子表*/
	contractFileModularList?:ContractFileModular[];






	/**页面需要零食属性 */
	modularListSelect?:any[];//模块下拉数据集合
}
