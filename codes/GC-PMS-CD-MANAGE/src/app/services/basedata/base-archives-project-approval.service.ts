import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { BaseArchivesProjectApproval } from 'app/entity/basedata/base-archives-project-approval';

@Injectable({
  providedIn: 'root'
})
/**
 * 项目立项档案
 */
export class BaseArchivesProjectApprovalService {

  constructor(private http:HttpClient) { }
  //查詢Tree
  async getTreeList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('/basedata/projectApproval/list', { params: body }).toPromise();
  }

  //新增
  async add(body: BaseArchivesProjectApproval): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/projectApproval/add', body).toPromise();
  }

  //修改
  async update(body: BaseArchivesProjectApproval): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/projectApproval/edit', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<BaseArchivesProjectApproval>> {
    return await this.http.get<BaseResponse<BaseArchivesProjectApproval>>("basedata/projectApproval/queryById", { params: { id: id } }).toPromise();
  }

  //删除
  async delete(body:any):Promise<BaseResponse<any>>{
    return await this.http.post<BaseResponse<any>>('basedata/projectApproval/delete',body).toPromise();
  }
}
