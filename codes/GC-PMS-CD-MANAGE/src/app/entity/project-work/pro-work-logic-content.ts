import { Page } from '../page';
/**
 * 日志明细表
 */
export class ProWorkLogicContent extends Page{
    id?:string;
	//日志id
	logicId?:string;
	//计划id
	proPlanId?:string;
	//项目档案id
	proArchivesId?:string;
	//项目档案里程碑
	proArchivesMilestone?:string;
	//工作内容
	content?:string;
	//工作时长
	duration?:number;
	//组织
	pkOrg?:string;
}
