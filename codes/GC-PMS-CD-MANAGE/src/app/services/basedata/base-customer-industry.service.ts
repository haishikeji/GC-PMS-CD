import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { BaseCustomerIndustry } from 'app/entity/basedata/base-customer-industry';

@Injectable({
  providedIn: 'root'
})
/**
 * 客商行业
 */
export class BaseCustomerIndustryService {

  constructor(private http:HttpClient) { }

  //查詢Tree
  async getTreeList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('/basedata/baseCustomerIndustry/getTreeList', { params: body }).toPromise();
  }

   //新增
   async add(body: BaseCustomerIndustry): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseCustomerIndustry/add', body).toPromise();
  }

  //修改
  async update(body: BaseCustomerIndustry): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('basedata/baseCustomerIndustry/edit', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<BaseCustomerIndustry>> {
    return await this.http.get<BaseResponse<BaseCustomerIndustry>>("basedata/baseCustomerIndustry/queryById", { params: { id: id } }).toPromise();
  }

  //删除
  async delete(id:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('basedata/baseCustomerIndustry/delete',{ params: { id: id } }).toPromise();
  }

}
