import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { ManagerPaymentAndReceiptSlip } from 'app/entity/down-payment-management/manager-payment-and-receipt-slip';

@Injectable({
  providedIn: 'root'
})
export class ManagerPaymentAndReceiptSlipService {

  constructor(private http:HttpClient) { }
  //分页查询
  async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/payment/managerPaymentAndReceiptSlip/list', { params: body })
      .toPromise();
  }

  //新增
  async add(body: ManagerPaymentAndReceiptSlip): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('payment/managerPaymentAndReceiptSlip/add', body).toPromise();
  }

  //根据id查询
  async queryById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('payment/managerPaymentAndReceiptSlip/queryById', { params: { id: id } })
      .toPromise();
  }

  //删除
  async delete(body:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('payment/managerPaymentAndReceiptSlip/delete',{params:body}).toPromise();
  }

  //修改
  async update(body: ManagerPaymentAndReceiptSlip): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('payment/managerPaymentAndReceiptSlip/edit', body).toPromise();
  }

  //财务确认收款数据查询
  async getFinanceList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/payment/managerPaymentAndReceiptSlip/getFinanceList', { params: body })
      .toPromise();
  }

  //财务确认收款确认
  async editFinanceList(body: ManagerPaymentAndReceiptSlip): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('payment/managerPaymentAndReceiptSlip/editFinanceList', body).toPromise();
  }
}
