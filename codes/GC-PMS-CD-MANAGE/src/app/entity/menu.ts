export class Menu{
  id?:string;
  name:string;
  menuType?:number;
  perms?:string;
  url?:string;
  component?:string;
  redirect?:string;
  icon?:string;
  sortNo:number;
  hidden?:boolean;
  alwaysShow?:boolean;
  route?:boolean;
  parentName?:string;
  parentId?:string;
  pkOrg?:string;//组织id
}