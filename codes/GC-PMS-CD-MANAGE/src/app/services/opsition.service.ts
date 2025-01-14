import { Injectable } from '@angular/core';
import { Opsition } from 'app/entity/opsition';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { HttpClient } from '@angular/common/http';
import { Depart } from 'app/entity/depart';

@Injectable({
  providedIn: 'root'
})
export class OpsitionService {

  constructor(private http: HttpClient) { }

  //查询全部的数据list
  async getAllOpsition(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('basedata/bmPosition/list', { params: body }).toPromise();
  }

  //数据添加
  async addPosition(body: Opsition): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/bmPosition/add', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<Opsition>> {
    return await this.http.get<BaseResponse<Opsition>>("basedata/bmPosition/queryById", { params: { id: id } }).toPromise();
  }

  //修改
  async updateOpsition(body: Opsition): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('basedata/bmPosition/edit', body).toPromise();
  }

  //删除
  async deleteOpsition(id:string):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('basedata/bmPosition/delete',{params:{id:id}}).toPromise();
  }

  //根据type查询部门
  async getByType(typeId:string):Promise<BaseResponse<Depart>>{
    return await this.http.post<BaseResponse<Depart>>('sysdepart/sysDepart/getByType',typeId).toPromise();
  }

}
