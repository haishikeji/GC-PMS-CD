import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { BaseArchivesMilestone } from 'app/entity/basedata/base-archives-milestone';

@Injectable({
  providedIn: 'root',
})
/**
 * 里程碑档案
 */
export class BaseArchivesMilestoneService {
  constructor(private http: HttpClient) {}

  //查詢Tree
  async getTreeList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/basedata/baseArchivesMilestone/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: BaseArchivesMilestone): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseArchivesMilestone/add', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('basedata/baseArchivesMilestone/queryById', { params: { id: id } })
      .toPromise();
  }

  //修改
  async update(body: BaseArchivesMilestone): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseArchivesMilestone/edit', body).toPromise();
  }

  //删除
  async delete(body: any): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseArchivesMilestone/delete', body).toPromise();
  }

  //查詢父级里程碑
  async getAllParent(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/basedata/baseArchivesMilestone/getAll', { params: body })
      .toPromise();
  }
}
