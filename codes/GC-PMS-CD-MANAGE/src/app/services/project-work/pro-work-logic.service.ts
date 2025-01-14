import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { ProWorkLogic } from 'app/entity/project-work/pro-work-logic';

@Injectable({
  providedIn: 'root'
})
/**
 * 日志管理
 */
export class ProWorkLogicService {

  constructor(private http:HttpClient) { }

   //分页查询
   async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/prowork/proWorkLogic/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: ProWorkLogic): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('/prowork/proWorkLogic/add', body).toPromise();
  }

  //根据id查询
  async getListById(id: string): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>("prowork/proWorkLogic/queryById", { params: { id: id } }).toPromise();
  }

  //修改
  async update(body: ProWorkLogic): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('prowork/proWorkLogic/edit', body).toPromise();
  }

   //删除
   async delete(body:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('prowork/proWorkLogic/delete',{params:body}).toPromise();
  }

  
  
}
