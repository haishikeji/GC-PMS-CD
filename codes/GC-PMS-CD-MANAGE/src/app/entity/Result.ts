export class Result<T>{
    current: number;
    pages: number;
    records: T;
    searchCount:boolean;
    size:number;
    total:number;
    pkOrg?:string;//组织id
  }