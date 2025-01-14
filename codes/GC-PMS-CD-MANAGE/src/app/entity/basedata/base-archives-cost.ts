import { Page } from '../page';
/**
 * 费用档案
 */
export class BaseArchivesCost extends Page{
    id?:string;// 费用主键
    code?:string;//费用编码
    name?:string;//费用名称
    pkOrg?:string;//组织id
}
