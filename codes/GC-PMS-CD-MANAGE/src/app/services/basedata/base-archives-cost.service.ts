import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { BaseArchivesCost } from 'app/entity/basedata/base-archives-cost';

@Injectable({
  providedIn: 'root'
})
/**
 * 费用档案
 */
export class BaseArchivesCostService {

  constructor(private http:HttpClient) { }

  //分页查询
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/basedata/baseArchivesCost/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: BaseArchivesCost): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseArchivesCost/add', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('basedata/baseArchivesCost/queryById', { params: { id: id } })
      .toPromise();
  }

  //修改
  async update(body: BaseArchivesCost): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseArchivesCost/edit', body).toPromise();
  }

  //删除
  async delete(body: any): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseArchivesCost/delete', body).toPromise();
  }
}
