import { Page } from '../page';
/**
 * 费用报销单
 */
export class ReExpenseSlip  extends Page{
    id?:string;
    //人员id
    personId?:string;
    //人员
    person?:string;
    //日期
    date?:string;
    //制单人id
    producerId?:string;
    //制单人
    producer?:string;
    //审核人id
    reviewerId?:string;
    //审核人
    reviewer?:string;
    //项目id
    proId?:string;
    //项目名
    proName?:string;
    //组织
    pkOrg?:string;
    //明细集合
    detailList?:any[];
}
