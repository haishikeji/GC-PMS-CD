import { Page } from './page';

export class PermissionDataRule extends Page{
	id?:string;
  /**
	 * 对应的菜单id
	 */
	  permissionId?:string;
	
	/**
	 * 规则名称
	 */
	  ruleName?:string;
	
	/**
	 * 字段
	 */
	  ruleColumn?:string;
	
	/**
	 * 条件
	 */
	  ruleConditions?:string;
	
	/**
	 * 规则值
	 */
		ruleValue?:string;
	
		dataRuleIds?:string;//数据规则ids
		pkOrg?:string;//组织id
}
