import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(private http: HttpClient) { }

  // 查询全部人员
  async getAllPersonnel(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('basedata/fdPersonnel/listAllPage', { params: body }).toPromise();
  }

  // 查询全部人员page
  async findPagelist(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('basedata/fdPersonnel/findPagelist', { params: body }).toPromise();
  }

  // 查询全部人员page(有权限)
  async findPagelist1(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('basedata/fdPersonnel/findPagelist1', { params: body }).toPromise();
  }

  //查询部分下的全部人员tree
  async getPersonnelOrDepart(): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>('basedata/fdPersonnel/getPersonnelOrDepart').toPromise();
  }

  // 新增
  async addPersonnel(body: any): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/fdPersonnel/add', body).toPromise();
  }

  //删除
  async deletePersonnel(id: string): Promise<BaseResponse<any>> {
    return await this.http.delete<BaseResponse<any>>('basedata/fdPersonnel/delete', { params: { id: id } }).toPromise();
  }

  //根据id查询
  async getById(id:string): Promise<BaseResponse<any>>{
    return await this.http.get<BaseResponse<any>>('basedata/fdPersonnel/queryById', { params: { id: id } }).toPromise();
  }

  //根据公司的id查询部门
  async getByOrgId(id:string): Promise<BaseResponse<any>>{
    return await this.http.post<BaseResponse<any>>('basedata/fdPersonnel/getByOrgId',id).toPromise();
  }

  //修改
  async updatePersonnel(body: any): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('basedata/fdPersonnel/edit', body).toPromise();
  }

  //查询审批人员信息
  async queryApprover(pkOrg:string): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>('basedata/fdPersonnel/queryApprover',{params:{pkOrg:pkOrg}}).toPromise();
  }

  //自写修改
  async personnelUpdate(body: any): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('basedata/fdPersonnel/personnelUpdate', body).toPromise();
  }
}
