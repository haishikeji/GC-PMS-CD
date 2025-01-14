import { Menu } from './../entity/menu';
import { BaseResponse } from './../entity/baseResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) { }

  //获取所有的菜单信息
  async getMenus(): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>('sys/permission/list').toPromise();
  }

  //获取所有的菜单信息(权限)
  async getMenus1(body:any): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>('sys/permission/list1',{params:body}).toPromise();
  }
  //新增菜单
  async add(body:Menu): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('sys/permission/add',body).toPromise();
  }
  //修改菜单
  async edit(body:Menu): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('sys/permission/edit',body).toPromise();
  }
  //删除菜单
  async delete(id:string): Promise<BaseResponse<any>> {
    return await this.http.delete<BaseResponse<any>>('sys/permission/delete',{params:{id:id}}).toPromise();
  }
  //获取全部权限树菜单
  async queryTreeList(): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>('sys/permission/queryTreeList').toPromise();
  }
  //获取全部权限树菜单
  async queryById(id): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>('sys/permission/queryById',{params:{id:id}}).toPromise();
  }
}
