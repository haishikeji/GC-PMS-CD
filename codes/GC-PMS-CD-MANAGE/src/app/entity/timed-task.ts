import { Page } from './page';

/**
 * @fileoverview 定时任务实体类
 * 无依赖项
 * @author 冯海夫
 * Copyright 2019 上海翠颠信息科技有限公司. All Rights Reserved.
 */
export class TimedTask extends Page{
  id?:string;
  delFlag?:number;    // 删除状态
  jobClassName?:string;    // 任务类名
  cronExpression?:string;// Cron表达式
  parameter?:string;    // 参数
  description?:string; // 描述
  status?:number;       // 状态0-正常，1-停止
  createBy?:string;    // 创建人
  createTime?:string;  // 创建时间
  updateBy?:string;    // 更新人
  updateTime?:string;  // 更新时间
  pkOrg?:string;//组织id
}