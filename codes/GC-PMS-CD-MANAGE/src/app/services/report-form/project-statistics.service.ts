import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';

@Injectable({
  providedIn: 'root'
})
/**
 * 报表
 */
export class ProjectStatisticsService {

  constructor(private http:HttpClient) { }

  //获取成本核算数据
  async getCostAccountingData(body: any): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>("report/getCostAccountingData", { params: body }).toPromise();
  }

  //项目情况统计表
  async getProStatistics(body: any): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>("report/getProStatistics", { params: body }).toPromise();
  }
}
