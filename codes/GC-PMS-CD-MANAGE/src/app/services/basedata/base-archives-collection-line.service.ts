import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { BaseArchivesCollectionLine } from 'app/entity/basedata/base-archives-collection-line';

@Injectable({
  providedIn: 'root'
})
/**
 * 收付款条线档案
 */
export class BaseArchivesCollectionLineService {

  constructor(private http:HttpClient) { }

  //查詢Tree
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/basedata/baseArchivesCollectionLine/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: BaseArchivesCollectionLine): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseArchivesCollectionLine/add', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('basedata/baseArchivesCollectionLine/queryById', { params: { id: id } })
      .toPromise();
  }

  //修改
  async update(body: BaseArchivesCollectionLine): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('basedata/baseArchivesCollectionLine/edit', body).toPromise();
  }

  //删除
  async delete(id: any): Promise<BaseResponse<any>> {
    return await this.http.delete<BaseResponse<any>>('basedata/baseArchivesCollectionLine/delete', {params:{id:id}}).toPromise();
  }
}
