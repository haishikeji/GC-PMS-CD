import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { BaseArchivesPost } from 'app/entity/basedata/base-archives-post';

@Injectable({
  providedIn: 'root',
})
/**
 * 职务档案
 */
export class BaseArchivesPostService {
  constructor(private http: HttpClient) {}

  //查詢全部
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('/base/archivesPost/list', { params: body }).toPromise();
  }

  //查詢Tree
  async getTreeList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('/base/archivesPost/list', { params: body }).toPromise();
  }

  //新增
  async add(body: BaseArchivesPost): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('base/archivesPost/add', body).toPromise();
  }

  //修改
  async update(body: BaseArchivesPost): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('base/archivesPost/edit', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<BaseArchivesPost>> {
    return await this.http.get<BaseResponse<BaseArchivesPost>>("base/archivesPost/queryById", { params: { id: id } }).toPromise();
  }

  //删除
  async delete(body:any):Promise<BaseResponse<any>>{
    return await this.http.post<BaseResponse<any>>('base/archivesPost/delete',body).toPromise();
  }
}
