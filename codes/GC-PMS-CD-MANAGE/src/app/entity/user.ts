import { Page } from './page';

export class User extends Page{
  id?:string;
  username:string;
  realname?:string;
  password?:string;
  salt?:string;
  avatar?:string;
  birthday?:string;
  sex?:string;
  email?:string;
  phone?:string;
  status?:string;
  selectedroles?:string;
  personnelId?:string;
  roleId?:string;//角色id
  delFlag?:string;
  roleList?:any;
  roleIdList?:any;
  departName?:string;
  roleName?:string;//角色名称
  personnelName?:string;//代理人名称
  pkOrg?:string;//组织id
}