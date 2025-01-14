import { Page } from '../page';
/**
 * 首付款主表
 */
export class ManagerPaymentAndReceiptSlip extends Page {
    id?:string;
    //单据编号
    billcode?:string;
    //1.收款单 2.付款单
    type?:string;
    //项目id
    proId?:string;
    //项目名称
    proName?:string;
    //项目编码
    proCode?:string;
    //客户档案id
    cusId?:string;
    //客户档案编码
    cusCode?:string;
    //客户档案名称
    cusName?:string;
    //组织
    pkOrg?:string;
    //子表数据
    detailList?:any[];
    //总收款金额
    totalPrice?:number;
}
