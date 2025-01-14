import { Page } from '../page';

/**
 * 项目立项档案
 */
export class BaseArchivesProjectApproval  extends Page{
    key?:string;
    id?:string;// 项目立项主键
    code?:string;//项目立项编码
    name?:string;//项目立项名称
    parentId?:string;//父级id
    status?:string;//是否启用
    pkOrg?:string;//组织id
}
