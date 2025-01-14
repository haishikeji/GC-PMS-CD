import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { BaseSalesStatus } from 'app/entity/basedata/base-sales-status';

@Injectable({
  providedIn: 'root'
})
/**
 * 销售状态
 */
export class BaseSalesStatusService {

  constructor(private http:HttpClient) { }
  //查詢Tree
  async getTreeList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('/basedata/baseSalesStatus/getTreeList', { params: body }).toPromise();
  }

   //新增
   async add(body: BaseSalesStatus): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseSalesStatus/add', body).toPromise();
  }

  //修改
  async update(body: BaseSalesStatus): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('basedata/baseSalesStatus/edit', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<BaseSalesStatus>> {
    return await this.http.get<BaseResponse<BaseSalesStatus>>("basedata/baseSalesStatus/queryById", { params: { id: id } }).toPromise();
  }

  //删除
  async delete(id:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('basedata/baseSalesStatus/delete',{ params: { id: id } }).toPromise();
  }
}
