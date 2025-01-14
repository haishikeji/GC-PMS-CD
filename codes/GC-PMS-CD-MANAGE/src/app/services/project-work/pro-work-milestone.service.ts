import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { ProWorkMilestone } from 'app/entity/project-work/pro-work-milestone';

@Injectable({
  providedIn: 'root',
})
/**
 * 里程碑确认单
 */
export class ProWorkMilestoneService {
  constructor(private http: HttpClient) {}

  //分页查询
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/prowork/proWorkMilestone/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: ProWorkMilestone): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('/prowork/proWorkMilestone/add', body).toPromise();
  }

  //根据id查询
  async queryById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('prowork/proWorkMilestone/queryById', { params: { id: id } })
      .toPromise();
  }

  //修改
  async update(body: ProWorkMilestone): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('prowork/proWorkMilestone/edit', body).toPromise();
  }

  //删除
  async delete(body: any): Promise<BaseResponse<any>> {
    return await this.http.delete<BaseResponse<any>>('prowork/proWorkMilestone/delete', { params: body }).toPromise();
  }
}
