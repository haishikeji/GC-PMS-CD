import { Page } from '../page';

// 人员档案
export class Personnel extends Page {
    id?:string;
    code?:string;// 人员编码 (非空)
    name?:string;// 人员名称 (非空)
    enName?:string;// 英文名称
    gender?:string;// 性别 (非空)
    category?:string;// 人员类别，参照数据字典 (非空)
    mobile?:string;// 手机
    tel?:string;// 电话
    pkDepart?:string;// 所属部门
    pkOrg?:string;// 所属公司
    status?:string;// 人员状态，参照数据字典 (非空)
    email?:string;// 邮箱
    pkPersonnel?:string;// 直属领导
    delFlag?:string;// 删除标记0正常1删除
    enable?:string;// 可用状态0正常1失效
    version?:string;// 版本号
    departName?:string;// 部门名称
    orgName?:string;// 公司名称
    pkPersonnelId?:string;// 部门表中的人员主键
}
