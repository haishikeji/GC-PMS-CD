import { Page } from '../page';
/**
 * 合同产品模块
 */
export class ContractFileModular extends Page {
    /**主键*/
	id?:string;
	/**产品模块编码*/
	code?:string;
	/**产品模块名称*/
	name?:string;
	/**标准价格*/
	standardQuotation?:number;
	/**采购价格*/
	purchasePrice?:number;
	/**合同产品id*/
	contractFileProductId?:string;
	/**组织*/
	pkOrg?:string;
	/**排序*/
	sort?:number;
	/**主表id*/
	contractFileId?:string;
	/**物料档案模块id */
	baseMaterialFileModularId?:string;
}
