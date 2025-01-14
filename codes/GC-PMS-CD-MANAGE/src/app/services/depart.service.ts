import { Injectable } from '@angular/core';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { HttpClient } from '@angular/common/http';
import { Depart } from 'app/entity/depart';

@Injectable({
  providedIn: 'root'
})
export class DepartService {

  constructor(private http:HttpClient) { }

   // 查询全部部门(不按树形)
   async list(body:any): Promise<BaseResponse<Result<any[]>>> {
    return await this.http.get<BaseResponse<Result<any[]>>>('sysdepart/sysDepart/list',{params:body}).toPromise();
  }

  //查询全部的部门tree
  async getAllDepart(): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('sysdepart/sysDepart/queryTreeList').toPromise();
  }

  //查询全部的部门tree(有权限)
  async getAllDepart1(body:any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('sysdepart/sysDepart/queryTreeList1',{params:body}).toPromise();
  }

  //查询全部部门不是tree集合
  async getListDepart():Promise<BaseResponse<any>>{
    return await this.http.get<BaseResponse<any>>('sysdepart/sysDepart/getAllDepart').toPromise();
  }

  //部门数据添加
  async addDepart(body : Depart):Promise<BaseResponse<any>>{
    return await this.http.post<BaseResponse<any>>('sysdepart/sysDepart/add',body).toPromise();
  }

  //部门数据修改
  async updateDepart(body : Depart):Promise<BaseResponse<any>>{
    return await this.http.put<BaseResponse<any>>('sysdepart/sysDepart/edit',body).toPromise();
  }

  //删除部门数据
  async deleteDepart(id:string):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('sysdepart/sysDepart/delete',{params:{id:id}}).toPromise();
  }

  //根据id查询
  async getById(id:string):Promise<BaseResponse<Depart>>{
    return await this.http.post<BaseResponse<Depart>>('sysdepart/sysDepart/getById',id).toPromise();
  }

  //根据类型查询公司和部门
  async getByType(id:string): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('sysdepart/sysDepart/getByType',id).toPromise();
  }

  //根据公司查询部门
  async getByOrgId(id:string): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('sysdepart/sysDepart/getByOrgId',id).toPromise();
  }

  //查询除本身及以下的上级项目(any:Depart对象)
  async queryByNotParentId(body: any): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>("sysdepart/sysDepart/queryByNotParentId", { params: body }).toPromise();
  }
}
