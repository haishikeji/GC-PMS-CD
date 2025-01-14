import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { BaseMaterialFileClassification } from 'app/entity/basedata/base-material-file-classification';

@Injectable({
  providedIn: 'root'
})
/**
 * 物料档案分类
 */
export class BaseMaterialFileClassificationService {

  constructor(private http:HttpClient) { }
  //查詢Tree
  async getTreeList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('/basedata/baseMaterialFileClassification/getTreeList', { params: body }).toPromise();
  }

   //新增
   async add(body: BaseMaterialFileClassification): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseMaterialFileClassification/add', body).toPromise();
  }

  //修改
  async update(body: BaseMaterialFileClassification): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('basedata/baseMaterialFileClassification/edit', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<BaseMaterialFileClassification>> {
    return await this.http.get<BaseResponse<BaseMaterialFileClassification>>("basedata/baseMaterialFileClassification/queryById", { params: { id: id } }).toPromise();
  }

  //删除
  async delete(id:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('basedata/baseMaterialFileClassification/delete',{ params: { id: id } }).toPromise();
  }

}
