import { Page } from '../page';
import { BaseMaterialFileModular } from './base-material-file-modular';
/**
 * 物料档案产品
 */
export class BaseMaterialFileProduct extends Page{
    /**主键*/
	 id?:string;
	/**产品编码*/
	 code?:string;
	/**产品名称*/
	 name?:string;
	/**组织*/
	 pkOrg?:string;
	/**排序*/
	sort?:number;
	/**状态（0：未启用， 1：启用）*/
	status?:string;
	/**产品属性（1采购2销售）*/
	attribute?:string;
	/**分类id */
	baseMaterialFileClassificationId?:string;
	/**模块子表数据*/
	baseMaterialFileModularList?:BaseMaterialFileModular[];
}
