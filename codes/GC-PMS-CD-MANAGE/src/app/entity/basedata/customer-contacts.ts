import { Page } from '../page';
// 医院联系人
export class CustomerContacts extends Page{
    id?:string;// 联系人主键
    pkCustomerId?:String;// 客户表id
    contactPsn?:String;// 联系人
    contactTel?:String;// 联系人电话 (非空)
    email?:String;// 邮件 (非空)
    address?:string;// 联系人地址
    delFlag?:string;// 是否删除
    isDefault?:String;// 是否默认
    createBy?:string;// 创建人
    createTime?:Date;// 创建时间
    updateBy?:string;// 修改人
    updateTime?:Date;// 修改时间
    memo?:string;// 备注
    isDefaultBool?:boolean;//前端用于处理switch控件
    pkOrg?:string;//组织id
}
