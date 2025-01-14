import { BaseResponse } from './../entity/baseResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AnnountCementSendService {

    constructor(private http: HttpClient) { }

    //通过id查询系统通告表相关信息
    async queryAnnouncementById(id:string): Promise<BaseResponse<any>> {
      return await this.http.get<BaseResponse<any>>('sys/sysAnnouncementSend/queryAnnouncementById',{params:{id:id}}).toPromise();
    }

    //获取所有
    async list(body:any): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/sysAnnouncementSend/list',{params:body}).toPromise();
    }

    //根据id获取
    async queryById(id:string): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/sysAnnouncementSend/queryById',{params:{id:id}}).toPromise();
    }

    //新增
    async add(body:any): Promise<BaseResponse<any>> {
        return await this.http.post<BaseResponse<any>>('sys/sysAnnouncementSend/add',body).toPromise();
    }

    //修改
    async edit(body:any): Promise<BaseResponse<any>> {
        return await this.http.put<BaseResponse<any>>('sys/sysAnnouncementSend/edit',body).toPromise();
    }

    //删除
    async delete(id:string): Promise<BaseResponse<any>> {
        return await this.http.delete<BaseResponse<any>>('sys/sysAnnouncementSend/delete',{params:{id:id}}).toPromise();
    }

    //根据id修改阅读状态
    async updateReadFlagById(id:string): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/sysAnnouncementSend/updateReadFlagById',{params:{id:id}}).toPromise();
    }

    /**
     * 查询所有（无权限）
     * @param body 消息对象
     */
    async listNotJurisdiction(body:any): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/sysAnnouncementSend/listNotJurisdiction',{params:body}).toPromise();
    }







}
