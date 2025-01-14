import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';

@Injectable({
  providedIn: 'root',
})
/**
 * 项目档案
 */
export class ProjectManageArchivesService {
  constructor(private http: HttpClient) {}

  //分页查询
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/archives/projectManageArchives/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: ProjectManageArchives): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('archives/projectManageArchives/add', body).toPromise();
  }

  //根据id查询
  async queryById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('archives/projectManageArchives/queryById', { params: { id: id } })
      .toPromise();
  }

  //根据id查询主子表
  async getListById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('archives/projectManageArchives/getListById', { params: { id: id } })
      .toPromise();
  }

  //修改
  async update(body: ProjectManageArchives): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('archives/projectManageArchives/edit', body).toPromise();
  }

  //删除
  async delete(body: any): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('archives/projectManageArchives/delete', body).toPromise();
  }

  //根据档案id、类型id查询计划里程碑明细
  async getPlanListById(body: any): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('archives/projectManageArchives/getPlanListById', { params: body })
      .toPromise();
  }

  //根据档案id、类型id查询商务页签计划数据明细
  async getBusinessList(body: any): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('archives/projectManageArchives/getBusinessList', { params: body })
      .toPromise();
  }

  //根据主表id与类型查询商务里程碑信息收付款条线列表
  async getLineList(body: any): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('archives/projectManageArchives/getLineList', { params: body })
      .toPromise();
  }

  //根据主表id与类型查询商务里程碑信息收付款条线列表
  async getMileNameById(body: any): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('archives/projectManageArchives/getMileNameById', { params: body })
      .toPromise();
  }
}
