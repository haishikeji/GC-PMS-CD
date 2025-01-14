import { Page } from '../page';
/**
 * 里程碑确认单
 */
export class ProWorkMilestone extends Page{
    id?:string;
	//单据编号
	billcode?:string;
	//1.开发 2.实施 3.服务
	type?:string;
	//项目档案id
	proId?:string;
	//项目档案编码
	proCode?:string;
	//项目档案名称
	proName?:string;
	//客户档案id
	cusId?:string;
	//客户编码
    cusCode?:string;
    //客户名称
    cusName?:string;
	//里程碑id
	mileId?:string;
	//里程碑(计划)
	mileName?:string;
	//里程碑确认(0,未确认 1，确认)
	mileConfirm?:number;
	//确认时间
	confirmTime?:string;
	//工作内容
	content?:string;
	//工作时长
	duration?:number;
	//填写人(当前用户)
	currentUser?:string;
	//组织
	pkOrg?:string;
	//创建时间
	createTime?:string;
	//里程碑模板明细计划id
	planId?:string;
	//文件集合
	fileList?:any[];
}
