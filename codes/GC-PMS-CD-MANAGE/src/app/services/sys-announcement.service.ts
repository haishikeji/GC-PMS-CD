import { BaseResponse } from './../entity/baseResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AnnountCementService {

    constructor(private http: HttpClient) { }

    // 新增系统通告表 同事添加用户通告阅读标记表
    async addAll(body:any): Promise<BaseResponse<any>> {
      return await this.http.post<BaseResponse<any>>('sys/annountCement/addAll',body).toPromise();
    }

    //获取所有
    async list(body:any): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/annountCement/list',{params:body}).toPromise();
    }

    //根据id获取
    async queryById(id:string): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/annountCement/queryById',{params:{id:id}}).toPromise();
    }

    //新增
    async add(body:any): Promise<BaseResponse<any>> {
        return await this.http.post<BaseResponse<any>>('sys/annountCement/add',body).toPromise();
    }

    //修改
    async edit(body:any): Promise<BaseResponse<any>> {
        return await this.http.put<BaseResponse<any>>('sys/annountCement/edit',body).toPromise();
    }

    //删除
    async delete(id:string): Promise<BaseResponse<any>> {
        return await this.http.delete<BaseResponse<any>>('sys/annountCement/delete',{params:{id:id}}).toPromise();
    }









}
