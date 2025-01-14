import { Page } from '../page';

/**
 * 物料档案模块
 */
export class BaseMaterialFileModular extends Page {
    /**主键*/
	 id?:string;
	/**模块编码*/
	 code?:string;
	/**模块名称*/
	 name?:string;
	/**标准报价*/
	standardQuotation?:number;
	/**组织*/
	 pkOrg?:string;
	 /**产品id */
	 baseMaterialFileProductId?:string
}
