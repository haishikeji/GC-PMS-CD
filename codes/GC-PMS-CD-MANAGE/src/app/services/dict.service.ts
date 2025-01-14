import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { Dict } from 'app/entity/dict';
import { promise } from 'protractor';
import { Options } from 'selenium-webdriver/edge';

@Injectable({
  providedIn: 'root'
})
export class DictService {

  constructor(private http: HttpClient) { }

  //--陈创
  //查询全部的字典数据list
  async getAllDict(body : any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('sys/dict/list',{params:body}).toPromise();
  }

  //查询全部的字典数据list(有权限)
  async getAllDict1(body : any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('sys/dict/list1',{params:body}).toPromise();
  }

  //字典数据添加
  async addDict(body : Dict):Promise<BaseResponse<any>>{
    return await this.http.post<BaseResponse<any>>('sys/dict/add',body).toPromise();
  }

   //字典数据修改
   async updateDict(body : Dict):Promise<BaseResponse<any>>{
    return await this.http.put<BaseResponse<any>>('sys/dict/edit',body).toPromise();
  }

  //删除字典数据
  async deleteDict(id:string):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('sys/dict/delete',{params:{id:id}}).toPromise();
  }

  //根据id查询字典数据
  async getByIdDict(id:string):Promise<BaseResponse<Dict>>{
    return await this.http.post<BaseResponse<Dict>>('sys/dict/getByIdDict',id).toPromise();
  }

  //根据字典编码查询数据
  async getByDictCode(code:string):Promise<BaseResponse<Dict[]>>{
    return await this.http.get<BaseResponse<Dict[]>>('sys/dict/getDictItems/'+code).toPromise();
  }

  //根据字典编码查询数据
  async getDictItems(body:any):Promise<BaseResponse<Result<any>>>{
    return await this.http.get<BaseResponse<Result<any>>>('sys/dictItem/list',{params:body}).toPromise();
  }

  //新增数据字典项
  async addDictItem(body:any):Promise<BaseResponse<Result<any>>>{
    return await this.http.post<BaseResponse<Result<any>>>('sys/dictItem/add',body).toPromise();
  }

  //修改数据字典项
  async editDictItem(body:any):Promise<BaseResponse<Result<any>>>{
    return await this.http.put<BaseResponse<Result<any>>>('sys/dictItem/edit',body).toPromise();
  }

  //删除数据字典项
  async deleteDictItem(id:string):Promise<BaseResponse<Result<any>>>{
    return await this.http.delete<BaseResponse<Result<any>>>('sys/dictItem/delete',{params:{id:id}}).toPromise();
  }

}
