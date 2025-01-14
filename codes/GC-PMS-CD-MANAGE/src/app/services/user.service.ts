import { BaseResponse } from './../entity/baseResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    //获取所有的用户信息
    async getUsers(body:any): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/user/list',{params:body}).toPromise();
    }

    //获取所有的用户信息(有权限)
    async getUsers1(body:any): Promise<BaseResponse<any>> {
      return await this.http.get<BaseResponse<any>>('sys/user/list1',{params:body}).toPromise();
  }

    //根据id获取用户信息
    async queryById(id:string): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/user/queryById',{params:{id:id}}).toPromise();
    }

    //新增用户信息
    async add(body:any): Promise<BaseResponse<any>> {
        return await this.http.post<BaseResponse<any>>('sys/user/add',body).toPromise();
    }

    //修改用户信息
    async edit(body:any): Promise<BaseResponse<any>> {
        return await this.http.put<BaseResponse<any>>('sys/user/edit',body).toPromise();
    }

    //删除用户信息
    async delete(id:string): Promise<BaseResponse<any>> {
        return await this.http.delete<BaseResponse<any>>('sys/user/delete',{params:{id:id}}).toPromise();
    }

    //冻结/解冻用户信息
    async frozenBatch(body:any): Promise<BaseResponse<any>> {
        return await this.http.put<BaseResponse<any>>('sys/user/frozenBatch',body).toPromise();
    }

    //修改用户密码
    async changPassword(body:any): Promise<BaseResponse<any>> {
        return await this.http.put<BaseResponse<any>>('sys/user/changPassword',body).toPromise();
    }

    //修改用户密码
    async queryUserRole(id:string): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/user/queryUserRole',{params:{userid:id}}).toPromise();
    }

    /**
     * 代理用户
     * @param body
     */
    async agentPerson(body:any): Promise<BaseResponse<any>> {
        return await this.http.put<BaseResponse<any>>('sys/user/agentPerson',body).toPromise();
    }

    //查询角色下的人员
    async getUserByRoleId(roleId:string): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/user/getUserByRoleId',{params:{roleId:roleId}}).toPromise();
    }
}
