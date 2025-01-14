import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { BaseMaterialFileProduct } from 'app/entity/basedata/base-material-file-product';

@Injectable({
  providedIn: 'root'
})
/**
 * 物料档案产品
 */
export class BaseMaterialFileProductService {

  constructor(private http:HttpClient) { }

  //查詢列表数据
  async list(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('/basedata/baseMaterialFileProduct/list', { params: body }).toPromise();
  }

  //新增
  async add(body: BaseMaterialFileProduct): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseMaterialFileProduct/add', body).toPromise();
  }

  //主表子表一起新增
  async saveMainAndChild(body: BaseMaterialFileProduct): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('basedata/baseMaterialFileProduct/saveMainAndChild', body).toPromise();
  }

  //修改
  async update(body: BaseMaterialFileProduct): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('basedata/baseMaterialFileProduct/edit', body).toPromise();
  }

  //主表与子表一起修改
  async updateMainAndChild(body: BaseMaterialFileProduct): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('basedata/baseMaterialFileProduct/updateMainAndChild', body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<BaseMaterialFileProduct>> {
    return await this.http.get<BaseResponse<BaseMaterialFileProduct>>("basedata/baseMaterialFileProduct/queryById", { params: { id: id } }).toPromise();
  }

  //根据id查询主子表数据
  async queryMainAndChildById(id: string): Promise<BaseResponse<BaseMaterialFileProduct>> {
    return await this.http.get<BaseResponse<BaseMaterialFileProduct>>("basedata/baseMaterialFileProduct/queryMainAndChildById", { params: { id: id } }).toPromise();
  }

  //删除
  async delete(id:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('basedata/baseMaterialFileProduct/delete',{ params: { id: id } }).toPromise();
  }

  //主表和子表一起删除
  async deleteMainAndChild(id:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('basedata/baseMaterialFileProduct/deleteMainAndChild',{ params: { id: id } }).toPromise();
  }

}
