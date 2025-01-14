import { Page } from '../page';
/**
 * 合同收款计划
 */
export class ContractFileAndBusiness extends Page {
    id?:string;
	//项目档案id
	contractFileId?:string;
	//计划类型 1.商务 2.实施 3.开发 4.服务
	planType?:number;
	//计划名称
	planName?:string;
	//第一笔
	price1?:number;
	//第二笔
	price2?:number;
	//第三笔
	price3?:number;
	//第四笔
	price4?:number;
	//第五笔
	price5?:number;
	//对应里程碑1
	milestone1?:string;
	//对应里程碑2
	milestone2?:string;
	//对应里程碑3
	milestone3?:string;
	//对应里程碑4
	milestone4?:string;
	//对应里程碑5
	milestone5?:string;
	//组织
	pkOrg?:string;
}
