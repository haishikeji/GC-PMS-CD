import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Result } from 'app/entity/Result';
import { InvoiceManagePurchase } from 'app/entity/invoice-management/invoice-manage-purchase';

@Injectable({
  providedIn: 'root'
})
/**
 * 发票管理
 */
export class InvoiceManagePurchaseService {

  constructor(private http:HttpClient) { }

   //分页查询
   async getList(body: any): Promise<BaseResponse<Result<any>>> {
    return await this.http
      .get<BaseResponse<Result<any>>>('/invoice/invoiceManagePurchase/list', { params: body })
      .toPromise();
  }

   //新增
   async add(body: InvoiceManagePurchase): Promise<BaseResponse<any>> {
    return await this.http.post<BaseResponse<any>>('invoice/invoiceManagePurchase/add', body).toPromise();
  }

  //根据id查询
  async queryById(id: string): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('invoice/invoiceManagePurchase/queryById', { params: { id: id } })
      .toPromise();
  }

  //删除
  async delete(body:any):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('invoice/invoiceManagePurchase/delete',{params:body}).toPromise();
  }

  //修改
  async update(body: InvoiceManagePurchase): Promise<BaseResponse<any>> {
    return await this.http.put<BaseResponse<any>>('invoice/invoiceManagePurchase/edit', body).toPromise();
  }

  //根据主表id与类型查询商务里程碑信息收付款条线列表
  async getChildrenList(body: any): Promise<BaseResponse<any>> {
    return await this.http
      .get<BaseResponse<any>>('invoice/invoiceManagePurchase/getChildrenList', { params: body })
      .toPromise();
  }
}
