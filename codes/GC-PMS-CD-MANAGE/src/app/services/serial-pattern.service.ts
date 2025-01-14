import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { SerialPattern } from 'app/entity/serial-pattern';
import { promise } from 'protractor';
import { Options } from 'selenium-webdriver/edge';

@Injectable({
  providedIn: 'root'
})

/**
 * @fileoverview 编号模式网络服务类
 * 依赖编号模式实体类
 * @author 冯海夫
 * Copyright 2019 上海翠颠信息科技有限公司. All Rights Reserved.
 */
export class SerialPatternService {

  constructor(private http: HttpClient) { }

  /**
   * 获取分页编号模式列表
   *
   * @param {SerialPattern} body 编号模式对象
   * @return {Object} 编号模式列表
   */
  async list(body : any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('sys/serialPattern/list',{params:body}).toPromise();
  }

   /**
   * 获取分页编号模式列表(有权限)
   *
   * @param {SerialPattern} body 编号模式对象
   * @return {Object} 编号模式列表
   */
  async list1(body : any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('sys/serialPattern/list1',{params:body}).toPromise();
  }

  /**
   * 添加编号模式
   *
   * @param {SerialPattern} body 编号模式对象
   * @return {Object} 保存结果
   */
  async add(body : SerialPattern):Promise<BaseResponse<any>>{
    return await this.http.post<BaseResponse<any>>('sys/serialPattern/add',body).toPromise();
  }


  /**
   * 修改编号模式
   *
   * @param {SerialPattern} body 编号模式对象
   * @return {Object} 保存结果
   */
   async edit(body : SerialPattern):Promise<BaseResponse<any>>{
    return await this.http.put<BaseResponse<any>>('sys/serialPattern/edit',body).toPromise();
  }

  /**
   * 删除编号模式
   *
   * @param {id} body 编号模式主键
   * @return {Object} 删除结果
   */
  async delete(id:string):Promise<BaseResponse<any>>{
    const params = new HttpParams().set('id',id);
    return await this.http.delete<BaseResponse<any>>('sys/serialPattern/delete',{params}).toPromise();
  }

  /**
   * 根据id查询编号模式
   *
   * @param {id} body 编号模式主键
   * @return {Object} 编号模式对象
   */
  async queryById(id:string):Promise<BaseResponse<SerialPattern>>{
    return await this.http.get<BaseResponse<SerialPattern>>('sys/serialPattern/queryById',{params:{id:id}}).toPromise();
  }


}
