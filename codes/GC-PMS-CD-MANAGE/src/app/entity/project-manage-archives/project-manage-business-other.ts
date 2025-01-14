import { Page } from '../page';

export class ProjectManageBusinessOther extends Page{
	id?:string;
    //项目档案id
    proArchivesId?:string;
	 //计划类型 1.商务 2.实施 3.开发 4.服务
    planType?:number;
    //当前节点id
	keyId?:string;
	//父节点id
	parentId?:string;
	//里程碑id
	muilesId?:string;
	//里程碑名称
	muilesName?:string;
	//开始时间
	startDate?:string;
	//结束时间
	endDate?:string;
	//计划人天
	planTime?:string;
	//执行人
	executor?:string;
	//执行人id （来源角色表）
	executorId?:string;
	//实际人天
	realTime?:string;
	//组织
	pkOrg?:string;
}
