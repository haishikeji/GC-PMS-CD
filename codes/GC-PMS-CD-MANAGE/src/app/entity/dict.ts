import { Page } from './page';

export class Dict extends Page{
    id?:string;
    dictName?:string;//字典名称
    dictCode?:string;//字典编码
    description?:string;//描述
    pageNo?:number
    pkOrg?:string;//组织id
}

