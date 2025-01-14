import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { BaseMaterialFileModular } from 'app/entity/basedata/base-material-file-modular';

@Injectable({
  providedIn: 'root'
})
/**
 * 物料产品模块
 */
export class BaseMaterialFileModularService {

  constructor(private http:HttpClient) { }

  //查詢列表数据
  async list(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('/basedata/baseMaterialFileModular/list', { params: body }).toPromise();
  }

   //新增
   async add(body: BaseMaterialFileModular): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseMaterialFileModular/add', body).toPromise();
  }

  //修改
  async update(body: BaseMaterialFileModular): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('basedata/baseMaterialFileModular/edit', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<BaseMaterialFileModular>> {
    return await this.http.get<BaseResponse<BaseMaterialFileModular>>("basedata/baseMaterialFileModular/queryById", { params: { id: id } }).toPromise();
  }

  //删除
  async delete(id:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('basedata/baseMaterialFileModular/delete',{ params: { id: id } }).toPromise();
  }

}
