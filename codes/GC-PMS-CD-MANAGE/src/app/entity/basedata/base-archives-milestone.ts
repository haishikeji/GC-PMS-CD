import { Page } from '../page';
/**
 * 里程碑档案
 */
export class BaseArchivesMilestone  extends Page{
    key?:string;
    id?:string;// 里程碑主键
    code?:string;//里程碑编码
    name?:string;//里程碑名称
    parentId?:string;//父级id
    type?:string;//类别-数据字典
    typeId?:string;//类型id
    pkOrg?:string;//组织id

}
