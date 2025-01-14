import { Page } from '../page';
/**
 * 收付款条线档案
 */
export class BaseArchivesCollectionLine extends Page{
    id?:string;// 收付款条线主键
    code?:string;//收付款条线编码
    name?:string;//收付款条线名称
    pkOrg?:string;//组织id
}
