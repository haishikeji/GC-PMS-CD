import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { TimedTask } from 'app/entity/timed-task';
import { promise } from 'protractor';
import { Options } from 'selenium-webdriver/edge';

@Injectable({
  providedIn: 'root'
})

/**
 * @fileoverview 定时任务网络服务类
 * 依赖定时任务实体类
 * @author 冯海夫
 * Copyright 2019 上海翠颠信息科技有限公司. All Rights Reserved.
 */
export class TimedTaskService {

  constructor(private http: HttpClient) { }

  /**
   * 获取分页定时任务列表
   *
   * @param {TimedTask} body 定时任务对象
   * @return {Object} 定时任务列表
   */
  async list(body : any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('sys/quartzJob/list',{params:body}).toPromise();
  }

  /**
   * 添加定时任务
   *
   * @param {TimedTask} body 定时任务对象
   * @return {Object} 保存结果
   */
  async add(body : TimedTask):Promise<BaseResponse<any>>{
    return await this.http.post<BaseResponse<any>>('sys/quartzJob/add',body).toPromise();
  }

   
  /**
   * 修改定时任务
   *
   * @param {TimedTask} body 定时任务对象
   * @return {Object} 保存结果
   */
   async edit(body : TimedTask):Promise<BaseResponse<any>>{
    return await this.http.put<BaseResponse<any>>('sys/quartzJob/edit',body).toPromise();
  }

  /**
   * 删除定时任务
   *
   * @param {id} body 定时任务主键
   * @return {Object} 删除结果
   */
  async delete(id:string):Promise<BaseResponse<any>>{
    const params = new HttpParams().set('id',id);
    return await this.http.delete<BaseResponse<any>>('sys/quartzJob/delete',{params}).toPromise();
  }

  /**
   * 根据id查询编号模式
   *
   * @param {id} body 定时任务主键
   * @return {Object} 定时任务对象
   */
  async queryById(id:string):Promise<BaseResponse<TimedTask>>{
    return await this.http.get<BaseResponse<TimedTask>>('sys/quartzJob/queryById',{params:{id:id}}).toPromise();
  }


}
