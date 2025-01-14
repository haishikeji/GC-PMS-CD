import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { ContractFile } from 'app/entity/contract-management/contract-file';

@Injectable({
  providedIn: 'root'
})
/**
 * 合同主表
 */
export class ContractFileService {

  constructor(private http:HttpClient) { }

  //分页查询
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('contract.file/contractFile/list', { params: body })
      .toPromise();
  }

  //分页查询
  async getPageList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('contract.file/contractFile/getPageList', { params: body })
      .toPromise();
  }

  //新增
  async add(body: ContractFile): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('contract.file/contractFile/add', body).toPromise();
  }

   //主表和子表数据一起保存
   async saveMainAndChild(body: ContractFile): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('contract.file/contractFile/saveMainAndChild', body).toPromise();
  }

  //根据id查询
  async queryById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('contract.file/contractFile/queryById', { params: { id: id } })
      .toPromise();
  }

  //根据主表id查询主子表数据
  async queryMainAndChildById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('contract.file/contractFile/queryMainAndChildById', { params: { id: id } })
      .toPromise();
  }

  //删除
  async delete(body:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('contract.file/contractFile/delete',{params:body}).toPromise();
  }

   //主表与子表一起删除
   async deleteMainAndChild(id:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('contract.file/contractFile/deleteMainAndChild',{params:{id:id}}).toPromise();
  }

  //修改
  async update(body: ContractFile): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('contract.file/contractFile/edit', body).toPromise();
  }
  

  //主表和子表一起修改
  async updateMainAndChild(body: ContractFile): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('contract.file/contractFile/updateMainAndChild', body).toPromise();
  }

  //提交流程
  async submitProcess(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('contract.file/contractFile/submitProcess', { params: { id: id } })
      .toPromise();
  }

  //详情接口
  async getContractFileById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('contract.file/contractFile/getContractFileById', { params: { id: id } })
      .toPromise();
  }

}
