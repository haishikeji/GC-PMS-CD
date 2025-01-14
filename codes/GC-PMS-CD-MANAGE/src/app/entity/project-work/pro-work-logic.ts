import { Page } from '../page';

/**
 * 日志主表
 */
export class ProWorkLogic extends Page{
    id?:string;
	//单据编号
	billcode?:string;
    //1.开发 2.实施 3.服务
    type?:string;
	//项目id
	proId?:string;
	//项目名称
	proName?:string;
	//开始日期
	startDate?:string;
	//结束日期
	endDate?:string;
	//汇报人id
	reporterId?:string;
	//汇报人
	reporter?:string;
	//里程碑id
	milesId?:string;
	//里程碑(计划)
	milesName?:string;
	//填写人(当前用户)
	currentUser?:string;
	//组织
	pkOrg?:string;
	//创建时间
	createTime?:string;
	//明细数据
	detailList?:any[];
}
