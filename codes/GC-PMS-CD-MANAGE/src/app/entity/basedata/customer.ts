import { Page } from '../page';
// 客户档案
export class Customer extends Page {
  id?: string;
  code?: string; // 客户编码 (非空)
  name?: string; // 客户名称 (非空)
  shortName?: string; // 客户简称
  abbreviation?: string; // 客户缩写
  enName?: string; // 英文名称
  address?: string; // 公司地址
  phone?: string; // 电话
  taxNo?: string; // 税号
  bank?: string; // 开户行
  account?: string; // 账号
  enable?: string; // 是否停用 (非空)
  creditGrade?: string; // 信用等级
  creditPeriod?: string; // 信用期
  delFlag?: string; // 是否删除
  fdCustomerContactsList?: []; // 联系人
  contacts?: string; // 默认联系人
  telephone?: string; // 默认联系人电话
  email?: string; // 默认联系人邮箱
  zipCode?: string; //邮编
  postalAddress?: string; //注册地址
  isAbbreviation?: string; //是否存在同样客户缩写1不存在2存在
  fdCustomerList?: []; //自身集合
  pkOrg?: string; //组织id

  /*------------------新加字段---------------------*/
  //客商分类(数据字典)
  customerClassificationDictValue?: string;
  //客商来源(数据字典)
  customerSourceDictValue?: string;
  //客商行业 id
  baseCustomerIndustryId?: string;
  //销售状态id
  baseSalesStatusId?: string;
  //客商属性
  customerAttribute?: string;
  //客商分组（数据字典）
  customerGroupingDictValue?: string;
  //商务关系（数据字典）
  businessRelationsDictValue?: string;
  // -----------------------------------------
  //上级单位（本表id）
  parentId?: string;
  //使用状态（数据字典）
  useStatusDictValue?: string;
  //休眠类型（数据字典）
  sleepTypeDictValue?: string;
  //单位网址
  companyWebsite?: string;
  //公司成立日期
  /**公司成立日期 yyyy-MM-dd*/
  companyEstablishDate?: string;
  //单位规模（数据字典）
  unitSizeDictValue?: string;

  //人员规模（数据字典）
  personnelSizeDictValue?: string;
  //注册资金（数据字典）
  registeredCapitalDictValue?: string;
  //年营业额
  annualTurnover?: number;
  //客户关系（数据字典）
  customerRelationshipDictValue?: string;
  //价值级别（数据字典）
  valueLevelDictValue?: string;
  //销售人员id
  salesmanId?: string;
  //销售人员名称
  salesmanName?: string; //[项目管理] 菜单里面新增 有个接口
  //开票单位名称
  billingUnitName?: string;
  //纳税人识别号
  taxpayerIdentificationNumber?: string;
  //开票地址
  billingAddress?: string;
  //开票电话
  billingTelephone?: string;
  //开票银行
  billingBank?: string;
  //开票银行账号
  billingBankAccountNumber?: string;
  //开发人员
  developer?: string;
  
  //开发时间
  /**开发时间 yyyy-MM-dd*/
  developmentDate?: string;

  /*--------------用来详情显示字段----------------- */
  //客商分类名称(数据字典)
  customerClassificationDictName?: string;
  //客商来源名称(数据字典)
  customerSourceDictName?: string;
  //客商行业名称
  baseCustomerIndustryName?: string;
  //销售状态名称
  baseSalesStatusName?: string;
  //客商分组名称（数据字典）
  customerGroupingDictName?: string;
  //商务关系名称（数据字典）
  businessRelationsDictName?: string;
  //上级单位名称（本表）
  parentName?: string;
  //使用状态名称（数据字典）
  useStatusDictName?: string;
  //休眠类型名称（数据字典）
  sleepTypeDictName?: string;
  //单位规模名称（数据字典）
  unitSizeDictName?: string;
  //人员规模名称（数据字典）
  personnelSizeDictName?: string;
  //注册资金名称（数据字典）
  registeredCapitalDictName?: string;
  //客户关系名称（数据字典）
  customerRelationshipDictName?: string;
  //价值级别名称（数据字典）
  valueLevelDictName?: string;
  ////////////////////////////////////
}
