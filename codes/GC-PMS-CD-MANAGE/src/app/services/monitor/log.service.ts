/*
 * @Descripttion: 日志服务
 * @version: 1.0
 * @Author: licc
 * @LastEditors: licc
 * @Date: 2019-04-26 11:26:24
 * @LastEditTime: 2019-04-27 16:46:13
 */
import { Injectable } from '@angular/core';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Log } from 'app/entity/monitor/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http:HttpClient) { }

  //查询全部的日志数据list
  async getLogs(body:Log): Promise<BaseResponse<Result<any>>> {
    const logParams = {
          logType:body.logType,
          pageNo:body.pageNo+""
    };
    return await this.http.get<BaseResponse<Result<any>>>('sys/log/list',{params:logParams}).toPromise();
  }
}