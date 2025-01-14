import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { ReExpenseSlip } from 'app/entity/expense-reimbursement/re-expense-slip';

@Injectable({
  providedIn: 'root'
})
export class ReExpenseSlipService {

  constructor(private http:HttpClient) { }

  //分页查询
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/expense/reExpenseSlip/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: ReExpenseSlip): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('expense/reExpenseSlip/add', body).toPromise();
  }

  //根据id查询
  async queryById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('expense/reExpenseSlip/queryById', { params: { id: id } })
      .toPromise();
  }

  //根据id查询主子表
  async getListById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('expense/reExpenseSlip/getListById', { params: { id: id } })
      .toPromise();
  }

  //删除
  async delete(body:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('expense/reExpenseSlip/delete',{params:body}).toPromise();
  }

  //修改
  async update(body: ReExpenseSlip): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('expense/reExpenseSlip/edit', body).toPromise();
  }
}
