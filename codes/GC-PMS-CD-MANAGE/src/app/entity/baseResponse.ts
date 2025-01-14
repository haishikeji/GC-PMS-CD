export class BaseResponse<T>{
  success: boolean;
  message: string;
  code: number;
  result:T;
  timestamp:number;
  pkOrg?:string;//组织id
}