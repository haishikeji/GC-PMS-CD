import { Page } from '../page';

/**
 * 职务档案
 */
export class BaseArchivesPost extends Page{
    key?:string;
    id?:string;// 职务主键
    code?:string;//职务编码
    name?:string;//职务名称
    parentId?:string;//父级id
    status?:string;//是否启用
    pkOrg?:string;//组织id
}
