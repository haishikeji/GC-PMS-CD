import { BaseResponse } from './../entity/baseResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'app/entity/role';

@Injectable({
    providedIn: 'root'
  })
export class RoleService {

    constructor(private http: HttpClient) { }

    //获取所有的角色信息
    async getRoles(body: any): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/role/list', { params: body }).toPromise();
    }

    //获取所有的角色信息(无需权限)
    async getRoles1(body: any): Promise<BaseResponse<any>> {
      return await this.http.get<BaseResponse<any>>('sys/role/list1', { params: body }).toPromise();
  }

    //新增角色信息
    async add(body: Role): Promise<BaseResponse<any>> {
        return await this.http.post<BaseResponse<any>>('sys/role/add', body).toPromise();
    }

    //修改角色信息
    async edit(body: Role): Promise<BaseResponse<any>> {
        return await this.http.put<BaseResponse<any>>('sys/role/edit', body).toPromise();
    }

    //根据id查询角色信息
    async queryById(id: string): Promise<BaseResponse<Role>> {
        return await this.http.get<BaseResponse<Role>>('sys/role/queryById', { params: { id: id } }).toPromise();
    }

    //根据id删除角色信息
    async delete(id: string): Promise<BaseResponse<any>> {
        return await this.http.delete<BaseResponse<any>>('sys/role/delete', { params: { id: id } }).toPromise();
    }

    //获取角色的权限信息
    async queryRolePermission(id: string): Promise<BaseResponse<any>> {
        return await this.http.get<BaseResponse<any>>('sys/permission/queryRolePermission', { params: { roleId: id } }).toPromise();
    }

    async saveRolePermission(body: any): Promise<BaseResponse<any>> {
        return await this.http.post<BaseResponse<any>>('sys/permission/saveRolePermission', body).toPromise();
    }
}
