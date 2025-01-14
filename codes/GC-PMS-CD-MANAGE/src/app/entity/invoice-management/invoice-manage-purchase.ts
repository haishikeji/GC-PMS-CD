import { Page } from '../page';
/**
 * 发票管理
 */
export class InvoiceManagePurchase extends Page{
    id?:string;
	//单据编号
	billcode?:string;
	//类型（1.采购发票 2.销售发票）
	type?:string;
	//项目档案id
	proArchivesId?:string;
	//项目编码
	proCode?:string;
	//项目名称
	proName?:string;
	//填写人(当前用户)
	currentUser?:string;
	//创建时间
	createTime?:string;
	//组织
    pkOrg?:string;
    //子表集合
    detailList?:any;
}
