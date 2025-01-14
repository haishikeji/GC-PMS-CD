import { Page } from './page';

/**
 * @fileoverview 编号模式实体类
 * 无依赖项
 * @author 冯海夫
 * Copyright 2019 上海翠颠信息科技有限公司. All Rights Reserved.
 */
export class SerialPattern extends Page{
  id?:string;
  tableName:string;    // 表名
  fieldName:string;    // 字段名
  serialPattern:string;// 编号模式
  description?:string; // 描述
  createBy?:string;    // 创建人
  createTime?:string;  // 创建时间
  updateBy?:string;    // 更新人
  updateTime?:string;  // 更新时间
  pkOrg?:string;
}