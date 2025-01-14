import { Page } from './page';

export class Opsition extends Page{
  id?:string;
  code?:string;//职位编码
  name?:string;//职位名称
  pkDepart?:string;//所属部门
  pkOrg?:string;//所属组织
  createBy?:string;//创建人
  createTime?:Date;//创建时间
  updateBy?:string;//修改人
  updateTime?:Date;//修改时间
  memo?:string;//备注
}
