import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from 'app/entity/Result';
import { BaseResponse } from 'app/entity/baseResponse';
import { PermissionDataRule } from 'app/entity/permission-data-rule';
import { RolePermission } from 'app/entity/role-permission';

@Injectable({
  providedIn: 'root'
})
/**
 * 数据规则
 */
export class PermissionDataRuleService {

  constructor(private http: HttpClient) {}

  //查询全部数据(any:PermissionDataRule)
  async getListPermissionDataRule(body: any): Promise<BaseResponse<Result<PermissionDataRule[]>>> {
    return await this.http.get<BaseResponse<Result<PermissionDataRule[]>>>('system/sysPermissionDataRule/list', { params: body }).toPromise();
  }

  //新增
  async add(body: PermissionDataRule): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('system/sysPermissionDataRule/add', body).toPromise();
  }

  //修改
  async update(body: PermissionDataRule): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('system/sysPermissionDataRule/edit', body).toPromise();
  }

   //根据id查询
   async getById(id: string): Promise<BaseResponse<PermissionDataRule>> {
    return await this.http.get<BaseResponse<PermissionDataRule>>("system/sysPermissionDataRule/queryById", { params: { id: id } }).toPromise();
  }

  //数据规则授权
  async updateDataRule(body: RolePermission): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('system/sysPermissionDataRule/updateDataRule', body).toPromise();
  }

  //已经授权的数据规则ids(any:RolePermission)
  async getDataRuleIds(body: any): Promise<BaseResponse<string[]>> {
    return await this.http.get<BaseResponse<string[]>>('system/sysPermissionDataRule/getDataRuleIds', { params: body }).toPromise();
  }
}
