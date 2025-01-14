
import { Page } from '../page';
/**
 * 销售状态
 */
export class BaseSalesStatus extends Page{
    key?:string;//tree主键
    id?:string;// 客商行业行业主键
    code?:string;//客商行业编码
    name?:string;//客商行业名称
    parentId?:string;//父级id
    status?:string;//是否启用
    pkOrg?:string;//组织id
    sort?:number;//序号
}
