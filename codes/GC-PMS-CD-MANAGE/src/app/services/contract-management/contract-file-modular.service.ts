import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { ContractFileModular } from 'app/entity/contract-management/contract-file-modular';

@Injectable({
  providedIn: 'root'
})
/**
 * 合同模块
 */
export class ContractFileModularService {

  constructor(private http:HttpClient) { }

  //分页查询
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/contract.file/contractFileModular/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: ContractFileModular): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('/contract.file/contractFileModular/add', body).toPromise();
  }

  //根据id查询
  async queryById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('/contract.file/contractFileModular/queryById', { params: { id: id } })
      .toPromise();
  }

  //删除
  async delete(body:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('/contract.file/contractFileModular/delete',{params:body}).toPromise();
  }

  //修改
  async update(body: ContractFileModular): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('/contract.file/contractFileModular/edit', body).toPromise();
  }
}
