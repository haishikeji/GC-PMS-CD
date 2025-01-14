import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { ContractFileProduct } from 'app/entity/contract-management/contract-file-product';

@Injectable({
  providedIn: 'root'
})
/**
 * 合同产品
 */
export class ContractFileProductService {

  constructor(private http:HttpClient) { }

  //分页查询
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/contract.file/contractFileProduct/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: ContractFileProduct): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('/contract.file/contractFileProduct/add', body).toPromise();
  }

  //根据id查询
  async queryById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('/contract.file/contractFileProduct/queryById', { params: { id: id } })
      .toPromise();
  }

  //删除
  async delete(body:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('/contract.file/contractFileProduct/delete',{params:body}).toPromise();
  }

  //修改
  async update(body: ContractFileProduct): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('/contract.file/contractFileProduct/edit', body).toPromise();
  }
}
