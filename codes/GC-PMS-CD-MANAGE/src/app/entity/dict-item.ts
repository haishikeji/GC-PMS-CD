import { Page } from './page';

export class DictItem extends Page{
  dictId?:string;//字典id
  pfFileJurisdiction?:string;//文件上传下载权限（项目档案中的文件上传下载权限）
  pkOrg?:string;//组织id
}
