import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { ContractFileAndBusiness } from 'app/entity/contract-management/contract-file-and-business';

@Injectable({
  providedIn: 'root'
})
/**
 * 收款计划
 */
export class ContractFileAndBusinessService {

  constructor(private http:HttpClient) { }
  //分页查询
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/contract.file/contractFileAndBusiness/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: ContractFileAndBusiness): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('/contract.file/contractFileAndBusiness/add', body).toPromise();
  }

  //根据id查询
  async queryById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('/contract.file/contractFileAndBusiness/queryById', { params: { id: id } })
      .toPromise();
  }

  //删除
  async delete(body:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('/contract.file/contractFileAndBusiness/delete',{params:body}).toPromise();
  }

  //修改
  async update(body: ContractFileAndBusiness): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('/contract.file/contractFileAndBusiness/edit', body).toPromise();
  }
}
