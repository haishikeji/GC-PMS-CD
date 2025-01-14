import { Page } from '../page';
/**
 * 物料档案分类
 */
export class BaseMaterialFileClassification extends Page {
  /**主键*/
  id?: string;
  /**编码*/
  code?: string;
  /**名称*/
  name?: string;
  /**父级id*/
  parentId?: string;
  /**排序*/
  sort?: number;

  /**用于tree */
  //id
  key?: string;

  pkOrg?:string; //组织
  
  //name
  title?: string;

  //是否尾端true/false
  isLeaf?: boolean;

  //子集
  children?: any[];
}
