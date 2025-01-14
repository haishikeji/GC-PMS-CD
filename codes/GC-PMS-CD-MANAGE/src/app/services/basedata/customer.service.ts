import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'app/entity/baseResponse';
import { Customer } from 'app/entity/basedata/customer';
import { Result } from 'app/entity/Result';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  //查詢全部
  async getCustomer(body:any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('basedata/fdCustomer/list',{params:body}).toPromise();
  }

  //查詢全部(需权限)
  async getCustomer1(body:any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('basedata/fdCustomer/list1',{params:body}).toPromise();
  }

   //查詢全部客户不带分页
   async getCustomerAll(body:any): Promise<BaseResponse<Customer[]>> {
    return await this.http.get<BaseResponse<Customer[]>>('basedata/fdCustomer/getCustomerListAll',{params:body}).toPromise();
  }


  //删除档案
  async deleteCustomer(id:string):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('basedata/fdCustomer/deleteBatch',{params:{ids:id}}).toPromise();
  }

  //新增客户档案
  async addCustomer(body : Customer):Promise<BaseResponse<any>>{
    return await this.http.post<BaseResponse<any>>('basedata/fdCustomer/add',body).toPromise();
  }

  //修改客户档案
  async updateCustomer(body : Customer):Promise<BaseResponse<any>>{
    return await this.http.put<BaseResponse<any>>('basedata/fdCustomer/edit',body).toPromise();
  }

  //根据id查询
  async getById(id: string): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>("basedata/fdCustomer/queryById", { params: { id: id } }).toPromise();
  }

  //查询是否存在同样客户缩写
  async isAbbreviation(customer:any): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>("basedata/fdCustomer/isAbbreviation", { params: customer }).toPromise();
  }
  //根据客户id查询报价是否有对应的客户
  async getProjectIsCustomer(id:string): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>("basedata/fdCustomer/getProjectIsCustomer", { params: {id:id} }).toPromise();
  }


  //联系人表

  //查询客户联系人
  async getListContacts(body:any): Promise<BaseResponse<Result<any>>> {
    return await this.http.get<BaseResponse<Result<any>>>('basedata/fdCustomerContacts/list',{params:body}).toPromise();
  }

  //根据id查询客户联系人
  async getByIdContacts(id: string): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>("basedata/fdCustomerContacts/queryById", { params: { id: id } }).toPromise();
  }

  //删除联系人
  async deleteContacts(id:string):Promise<BaseResponse<any>>{
    return await this.http.delete<BaseResponse<any>>('basedata/fdCustomerContacts/deleteBatch',{params:{ids:id}}).toPromise();
  }

  //新增客户档案
  async addContacts(body : Customer):Promise<BaseResponse<any>>{
    return await this.http.post<BaseResponse<any>>('basedata/fdCustomerContacts/add',body).toPromise();
  }

  //修改客户档案
  async updateContacts(body : Customer):Promise<BaseResponse<any>>{
    return await this.http.put<BaseResponse<any>>('basedata/fdCustomerContacts/edit',body).toPromise();
  }

  //根据客户id查询客户联系人
  async getContactsByMainId(customerId: string): Promise<BaseResponse<any>> {
    return await this.http.get<BaseResponse<any>>("basedata/fdCustomerContacts/getContactsByMainId", { params: { customerId: customerId } }).toPromise();
  }
}
