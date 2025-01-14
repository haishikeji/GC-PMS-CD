import { Page } from './page';

export class Role extends Page{
  id?: string;
  roleCode?: string;
  roleName?: string;
  description?: string;
  pageNo?: number
  delFlag?:string;//删除标记0否1是
  pkOrg?:string;
}