import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzDrawerRef, NzMessageService, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { CustomerService } from 'app/services/basedata/customer.service';
import { Customer } from 'app/entity/basedata/customer';
import { BasedataCustomerCustomerAddComponent } from '../customer-add/customer-add.component';
import { I18NService } from '@core';
import { CustomerContacts } from 'app/entity/basedata/customer-contacts';
import { messageShared } from '@shared/utils/message';
import { BasedataCustomerIsAbbreviationComponent } from '../is-abbreviation/is-abbreviation.component';
import { DictService } from 'app/services/dict.service';
import { BaseCustomerIndustry } from 'app/entity/basedata/base-customer-industry';
import { BaseCustomerIndustryService } from 'app/services/basedata/base-customer-industry.service';
import { BaseSalesStatus } from 'app/entity/basedata/base-sales-status';
import { BaseSalesStatusService } from 'app/services/basedata/base-sales-status.service';
import { PersonnelService } from 'app/services/basedata/personnel.service'; //销售人员
import { BasedataCustomerModalTableComponent } from '../modal-table/modal-table.component';
import { recursiveQuery } from '@shared/utils/yuan copy'; //筛选可选择
import { RoutesSharedModalCustomerSelectComponent } from 'app/routes/shared/modal/customer-select/customer-select.component';

@Component({
  selector: 'app-basedata-customer-edit',
  templateUrl: './edit.component.html',
  styles: [
    `
      .footer {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid rgb(232, 232, 232);
        padding: 10px 16px;
        text-align: right;
        left: 0px;
        background: #fff;
        z-index: 99;
      }
    `,
  ],
})
export class BasedataCustomerEditComponent implements OnInit {
  @Input() id: string; //项目id

  customer = {
    code: '',
    name: '',
    shortName: '',
    abbreviation: '',
    enName: '',
    address: '',
    phone: '',
    taxNo: '',
    bank: '',
    account: '',
    enable: '',
    creditGrade: '',
    creditPeriod: '',
    delFlag: '',
    fdCustomerContactsList: null,
    contacts: '',
    telephone: '',
    email: '',
    zipCode: '',
    postalAddress: '',
    pkOrg: '',
    //客商来源(数据字典)
    customerSourceDictValue: '',
    //客商分类(数据字典)
    customerClassificationDictValue: '',
    //客商行业id
    baseCustomerIndustryId: '',
    //销售状态id
    baseSalesStatusId: '',
    //客商属性
    customerAttribute: '1', //默认选中 1 客户
    // pageNo: '1', //默认页码
    //客商分组（数据字典）
    customerGroupingDictValue: '',
    //商务关系（数据字典）
    businessRelationsDictValue: '',
    //上级单位（本表id）
    parentId: '',
    //上级单位名称
    parentName: '',
    //使用状态（数据字典）
    useStatusDictValue: '',
    //休眠类型（数据字典）
    sleepTypeDictValue: '',
    //单位网址
    companyWebsite: '',
    //公司成立日期
    /**公司成立日期 yyyy-MM-dd*/
    companyEstablishDate: '',
    //单位规模（数据字典）
    unitSizeDictValue: '',
    //人员规模（数据字典）
    personnelSizeDictValue: '',
    //注册资金（数据字典）
    registeredCapitalDictValue: '',
    //年营业额
    annualTurnover: 0,
    //客户关系（数据字典）
    customerRelationshipDictValue: '',
    // 价值级别（数据字典）
    valueLevelDictValue: '',
    //销售人员id
    salesmanId: '',
    //销售人员名称
    salesmanName: '',
    //开票单位名称
    billingUnitName: '',
    //纳税人识别号
    taxpayerIdentificationNumber: '',
    //开票地址
    billingAddress: '',
    //开票电话
    billingTelephone: '',
    //开票银行
    billingBank: '',
    //开票银行账号
    billingBankAccountNumber: '',
    //开发人员
    developer: '',
    //开发时间
    /**开发时间 yyyy-MM-dd*/
    developmentDate: '',
  };

  baseCustomerIndustry: BaseCustomerIndustry = {}; //  客商行业 字段规范
  baseSalesStatus: BaseSalesStatus = {}; //  销售状态
  listOfData = []; //客户联系人集合

  enable = false; //是否停用
  codeDisabled = false;
  cryptoJS = require('crypto-js');
  tripledes = require('crypto-js/tripledes');
  selectId: { [key: string]: boolean } = {};

  constructor(
    private nzDrawerRef: NzDrawerRef,
    private customerService: CustomerService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private el: ElementRef,
    private i18NService: I18NService,
    private dictService: DictService,
    private baseCustomerIndustryService: BaseCustomerIndustryService,
    private baseSalesStatusService: BaseSalesStatusService,
    private personnelService: PersonnelService, //销售人员
  ) {}

  ngOnInit() {
    //所有字典数据
    this.getDictList()
      .then(res => {
        //客商行业数 树
        return this.getListIndustryTree();
      })
      .then(res => {
        //销售状态 树
        return this.getSalesStatusTree();
      })
      // .then(res => {
      //   //上级单位 弹框内列表
      //   return this.getTableList();
      // })
      .then(res => {
        //销售人员 树
        return this.getSalesStaffTree();
      });

    //根据id 判断新增 or 编辑
    if (this.id == '') {
      //新增
    } else {
      this.getById();
      this.getListContacts();
    }
  }

  /**
   * 获取数据字典数据
   */
  customerClassificationList = []; //客商分类数据
  customerSourceList = []; //客商来源数据
  baseCustomerIndustryId = String; //客商行业字段(树)
  merchantsIndustryList: any = []; //客商行业数据
  salesStatusList: any = []; //销售状态数据(树)
  customerGroupList = []; //客商分组
  busRelDictList = []; //商务关系数据
  useStatusList = []; //使用状态
  sleepTypeList = []; //休眠状态
  unitSizeList = []; //单位规模
  personnelSizeList = []; //人员规模
  registeredCapitalList = []; //注册资金
  customerRelationshipList = []; //客户关系
  valueLevelList = []; //价值级别
  salesStaffList: any = []; //销售人员数据(树)
  // children = []; //公司
  // dep = []; //部门

  //金额格式化 （公司注册资金）
  formatterDollar = (value: number) => {
    if (value) {
      return `$ ${value}`;
    } else {
      return `$ `;
    }
  };

  parserDollar = (value: string) => value.replace('$ ', '');

  //点击放大镜 上级单位 弹框
  modalTable() {
    const modalRef = this.modalService.create({
      nzTitle: '选择上级单位',
      nzContent: RoutesSharedModalCustomerSelectComponent,
      nzWidth: 1400,
      nzFooter: [
        {
          label: '关闭',
          type: 'default',
          onClick: addModel => {
            addModel.handleCancel();
          },
        },
        {
          label: '确定',
          type: 'primary',
          onClick: addModel => {
            addModel.handleOk();
            // addModel.selectObj 包含勾选项的 id 和 name
            this.customer.parentName = addModel.selectObj[0].name;
            this.customer.parentId = addModel.selectObj[0].id;
            console.log('addModel.selectObj：', this.customer.parentName, this.customer.parentId);
          },
        },
      ],
    });
  }

  // 所有字典数据
  getDictList() {
    return new Promise(resolve => {
      //获取客商分类数据
      this.dictService.getByDictCode('customer_classification').then(response => {
        this.customerClassificationList = response.result;
        resolve();
        //客商来源
        this.dictService.getByDictCode('information_sources').then(response => {
          this.customerSourceList = response.result;
          // console.log(this.customerSourceList);
          resolve();
          //客商分组
          this.dictService.getByDictCode('customer_grouping').then(response => {
            this.customerGroupList = response.result;
            // console.log(this.customerGroupList);
            resolve();
            //客商分组
            this.dictService.getByDictCode('business_relations').then(response => {
              this.busRelDictList = response.result;
              // console.log(this.customerGroupList);
              resolve();
              //使用状态
              this.dictService.getByDictCode('use_status').then(response => {
                this.useStatusList = response.result;
                // console.log(this.customerGroupList);
                resolve();
                //休眠类型
                this.dictService.getByDictCode('sleep_type').then(response => {
                  this.sleepTypeList = response.result;
                  resolve();
                  //单位规模
                  this.dictService.getByDictCode('unit_size').then(response => {
                    this.unitSizeList = response.result;
                    resolve();
                    //人员规模
                    this.dictService.getByDictCode('personnel_size').then(response => {
                      this.personnelSizeList = response.result;
                      resolve();
                      //注册资金
                      this.dictService.getByDictCode('registered_capital').then(response => {
                        this.registeredCapitalList = response.result;
                        resolve();
                        //客户关系
                        this.dictService.getByDictCode('customer-relationship').then(response => {
                          this.customerRelationshipList = response.result;
                          resolve();
                          //价值级别
                          this.dictService.getByDictCode('value_level').then(response => {
                            this.valueLevelList = response.result;
                            resolve();
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  //客商行业 树
  getListIndustryTree() {
    let baseCustomerIndustry = new BaseCustomerIndustry();
    baseCustomerIndustry.pkOrg = sessionStorage.getItem('pkOrg');
    this.baseCustomerIndustryService.getTreeList(baseCustomerIndustry).then(res => {
      this.merchantsIndustryList = [{ id: '', key: '', title: '请选择', isLeaf: true }];

      this.merchantsIndustryList = this.merchantsIndustryList.concat(res.result);
      console.log('>>>>', res.result);
    });
  }

  //销售状态 树
  getSalesStatusTree() {
    let baseSalesStatus = new BaseSalesStatus();
    baseSalesStatus.pkOrg = sessionStorage.getItem('pkOrg');
    this.baseSalesStatusService.getTreeList(baseSalesStatus).then(res => {
      this.salesStatusList = [{ id: '', value: '', title: '请选择', isLeaf: true }];
      this.salesStatusList = this.salesStatusList.concat(res.result);
      console.log('salesStatusList--->', this.salesStatusList);
    });
  }

  // 销售人员 树 （筛选可选择项）
  getSalesStaffTree() {
    this.personnelService
      .queryApprover(sessionStorage.getItem('pkOrg'))
      .then(res => {
        //赋值第一行是 “ 请选择 ”
        this.salesStaffList = [{ id: '', value: '', title: '请选择', isLeaf: true }];
        this.salesStaffList = this.salesStaffList.concat(res.result);
        console.log('销售人员树--->', this.salesStaffList);
      })
      // 调用筛选 可选择的 树方法recursiveQuery
      .then(res => {
        recursiveQuery(this.salesStaffList);
      });
  }

  //拿到选择的 销售人员ID
  onChangeSalesmanId(event) {
    if (event) {
      this.customer.salesmanId = event;
      this.salesStaffList.forEach(e => {
        console.log('11', e);
        var children = e.children;
        // console.log('22', children);
        if (children) {
          children.forEach(b => {
            var son = b.children;
            console.log('33', son);
            son.forEach(element => {
              var last = element;
              if (last.id == this.customer.salesmanId) {
                var n = last.name;
                console.log('////', n);
                this.customer.salesmanName = n;
              }
            });
          });
        }
      });
    }
  }
  //公司成立日期自带方法
  companyDateChange() {}

  // 客商行业 自带方法
  // onChangeMI(event) {
  //   console.log(event);
  //   this.customer.baseCustomerIndustryId = event;
  //   // =this.customer.baseCustomerIndustryId
  // }
  // 销售状态 自带方法
  onChangeSS($event) {}

  getById() {
    this.customerService.getById(this.id).then(response => {
      this.customer = response.result;
      if (response.result.enable == '0') {
        this.enable = false;
      } else {
        this.enable = true;
      }
      if (this.customer.email) {
        this.customer.email = this.tripledes.decrypt(this.customer.email, 'email').toString(this.cryptoJS.enc.Utf8);
      }
    });
  }

  //查询全部客联系人
  getListContacts() {
    var contacts = {
      pkCustomerId: this.id,
      pageSize: 500,
    };
    this.customerService.getListContacts(contacts).then(response => {
      this.listOfData = response.result.records;
      console.log(this.listOfData);
      this.listOfData.forEach(element => {
        if (element.email) {
          if (element.email) {
            element.email = this.tripledes.decrypt(element.email, 'email').toString(this.cryptoJS.enc.Utf8);
          }
        }
        //标识
        this.sort = this.listOfData.length + 1;
        //是否默认转换
        if (element.isDefault === '1') {
          element.isDefaultBool = true;
        } else {
          element.isDefaultBool = false;
        }
      });
    });
  }

  //新增客户联系人
  addContacts(data) {
    //model的title
    var title = '';
    if (data == null) {
      title = document.getElementById('titleAdd').textContent;
      this.codeDisabled = false;
    } else {
      title = document.getElementById('titleUpdate').textContent;
      this.codeDisabled = true;
    }
    //创建model
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: 800,
      nzContent: BasedataCustomerCustomerAddComponent,
      nzComponentParams: {
        data: data,
      },
      nzFooter: [
        // 确认按钮
        {
          // 关闭按钮
          label: this.i18NService.fanyi('button.close'),
          type: 'default',
          onClick: () => modal.close(),
        },
        {
          label: this.i18NService.fanyi('确定'),
          type: 'primary',
          onClick: model => {
            // if (this.id == "") {
            //新增客户时
            if (model.contacts.contactPsn != '') {
              //转换是否默认
              // if (BasedataCustomerCustomerAddComponent.isDefaults) {
              //默认联系人是否存在
              // var i = false;
              // this.listOfData.forEach(element => {
              //   if (element.isDefault== "1") {
              // i = true;
              //   }
              // });
              // if (i) {
              //   //  已存在默认联系人
              //   this.notification.warning(this.i18NService.fanyi("hospital.contarts.isdefault"), "")
              //   return;
              // }

              // BasedataCustomerCustomerAddComponent.contacts.isDefault = "1";
              // } else {
              // BasedataCustomerCustomerAddComponent.contacts.isDefault = "0";
              // }
              //model中的联系人对象
              const modelContact = model.contacts;
              let customerContacts = new CustomerContacts();
              customerContacts = modelContact;
              if (customerContacts.email) {
                customerContacts.email = this.tripledes.encrypt(customerContacts.email, 'email').toString();
              }

              // return;
              if (model.isDefaults) {
                customerContacts.isDefault = '1';
              } else {
                customerContacts.isDefault = '0';
              }
              if (this.id == '') {
                //点击新增联系人
                this.listOfData.push(customerContacts); //给联系人集合添加数据
                this.listOfData = [...this.listOfData];
                this.listOfData.forEach((element, i) => {
                  if (element.email && i + 1 === this.listOfData.length) {
                    element.email = this.tripledes.decrypt(element.email, 'email').toString(this.cryptoJS.enc.Utf8);
                  }
                });
                modal.close(); //关闭modal
              } else {
                //点击修改联系人
                this.addSave(modal, data, customerContacts);
              }
            } else {
              this.notification.warning(this.i18NService.fanyi('please.improve.the.data'), '');
            }
            // } else {
            //   //修改客户时
            //   this.addSave(modal, data, BasedataCustomerCustomerAddComponent);
            // }
          },
        },
      ],
    });
    //回调函数
    // modal.afterClose.subscribe(result => alert(result));
  }

  /**
   * @name: 修改进入对联系人的保存
   * @test: test font
   * @param {type}
   * @return:
   * @Author: chengchuang
   * @Date: 2019-10-14 17:11:09
   */
  addSave(modal, data, contacts) {
    // var contacts = BasedataCustomerCustomerAddComponent.contacts;//model联系人对象
    //转换是否默认、是否存在默认
    // if (BasedataCustomerCustomerAddComponent.isDefaults) {
    //   //是否已存在默认联系人
    //   var i = false;
    //   this.listOfData.forEach(element => {
    //     if (element.isDefault == "1") {
    //       i = true;
    //     }
    //   });
    //   contacts.isDefault = "1";
    // } else {
    //   contacts.isDefault = "0";
    // }
    // if (i) {
    //   this.notification.warning(this.i18NService.fanyi("hospital.contarts.isdefault"), "")
    //   return;
    // } else {
    if (data == null) {
      //新增
      contacts.pkCustomerId = this.id; //客户id
      this.customerService.addContacts(contacts).then(response => {
        if (response.success) {
          this.notification.success(this.i18NService.fanyi('newsuccess'), '');
          modal.close(); //关闭modal
          this.getListContacts(); //刷新联系人
        } else {
          this.notification.error(
            this.i18NService.fanyi('newfailure'),
            messageShared(this.i18NService, response.message),
          );
        }
      });
    } else {
      //修改
      this.customerService.updateContacts(contacts).then(response => {
        if (response.success) {
          this.notification.success(this.i18NService.fanyi('successful.revision'), '');
          modal.close(); //关闭modal
          this.getListContacts(); //刷新联系人
        } else {
          this.notification.error(
            this.i18NService.fanyi('modification.failed'),
            messageShared(this.i18NService, response.message),
          );
        }
      });
    }
  }

  //删除联系人
  deleteContacts(data): void {
    if (this.id == '') {
      //新增客户档案时
      // this.listOfData = this.listOfData.filter(d => d.contactPsn !== data.contactPsn);
      this.listOfData = this.listOfData.filter(d => d.sort !== data.sort);
    } else {
      //修改客户档案时
      this.customerService.deleteContacts(data.id).then(response => {
        if (response.success) {
          this.notification.success(this.i18NService.fanyi('successful.deletion'), '');
          this.getListContacts();
        } else {
          this.notification.error(
            this.i18NService.fanyi('delete.failed'),
            messageShared(this.i18NService, response.message),
          );
        }
      });
    }
  }
  isLoading = false;

  //最后保存
  save() {
    console.log('edit最后的保存', this.listOfData);
    var isdefault = 0;
    this.listOfData.forEach(element => {
      if (element.isDefault == '1') {
        //查询是否存在默认联系人
        isdefault++;
      }
    });

    if (isdefault == 0) {
      //是否有一个默认联系人
      this.notification.warning(this.i18NService.fanyi('must.have.a.default.contact'), '');
      return;
    } else if (isdefault > 1) {
      //只能存在一个默认联系人
      this.notification.warning(this.i18NService.fanyi('The.default.contact.can.only.be.one'), '');
      return;
    } else {
      this.saveCustomer();
    }
    //判断是否选择销售人员
    if (!this.customer.salesmanId) {
      this.notification.warning('错误提示', '必须选择销售人员'); //通知提醒框
      console.log('选择的销售人员', this.customer.salesmanId);
    }
  }

  //客户保存
  saveCustomer() {
    if (this.enable) {
      //是否停用
      this.customer.enable = '1';
    } else {
      this.customer.enable = '0';
    }
    this.listOfData.forEach(element => {
      if (element.email) {
        element.email = this.tripledes.encrypt(element.email, 'email').toString();
      }
    });
    this.customer.fdCustomerContactsList = this.listOfData; //客户联系人
    if (this.id == '') {
      //新增
      // this.listOfData.forEach(element => {
      //   if (element.email) {
      //     element.email = this.tripledes.encrypt(element.email, 'email').toString();
      //   }
      // });
      // this.customer.fdCustomerContactsList = this.listOfData;//客户联系人
      //查询条件
      let customer = new Customer();
      customer.abbreviation = this.customer.abbreviation;
      customer.pkOrg = sessionStorage.getItem('pkOrg');
      //查询是否存在同样客户缩写
      this.customerService.isAbbreviation(customer).then(response => {
        let customerResult: Customer = JSON.parse(JSON.stringify(response.result));
        //判断是否存在同样的客户缩写
        if (customerResult.isAbbreviation === '2') {
          //打开model提示是否需要保存
          const modalRef = this.modalService.create({
            nzTitle: this.i18NService.fanyi('pm.Tips'), //提示
            nzContent: BasedataCustomerIsAbbreviationComponent,
            nzWidth: '80%',
            nzComponentParams: {
              listOfData: customerResult.fdCustomerList, //当前客户缩写的客户
              abbreviation: this.customer.abbreviation, //客户缩写
            },
            nzFooter: [
              {
                label: this.i18NService.fanyi('button.cancel'),
                type: 'default',
                onClick: addModel => {
                  addModel.close();
                },
              },
              {
                label: this.i18NService.fanyi('determine'),
                type: 'primary',
                // loading:this.modelSaveLoading,
                onClick: addModel => {
                  // addModel.handOk()
                  // var map = addModel.map
                  // if (map != null && map.length > 0) {
                  //   this.openAddComponent(addModel.tempId, map, addModel.contractEntity)
                  //   addModel.close()
                  // }
                  //保存客户
                  this.addCustomerServerce();
                  addModel.close();
                },
              },
            ],
          });
        } else {
          //保存客户
          this.addCustomerServerce();
        }
      });
    } else {
      //修改保存
      if (this.customer.email) {
        this.customer.email = this.tripledes.encrypt(this.customer.email, 'email').toString();
      }
      this.isLoading = true;
      this.customerService.addCustomer(this.customer).then(response => {
        if (response.success) {
          // this.message.success(this.i18NService.fanyi("successful.revision"));
          this.isLoading = false;
          this.notification.success(this.i18NService.fanyi('successful.revision'), '');
          this.nzDrawerRef.close(true);
        } else {
          // this.message.error(this.i18NService.fanyi("modification.failed"));
          this.isLoading = false;
          this.customer.email = this.tripledes.decrypt(this.customer.email, 'email').toString(this.cryptoJS.enc.Utf8);
          this.notification.error(
            this.i18NService.fanyi('successful.revision'),
            messageShared(this.i18NService, response.message),
          );
        }
      });
    }
  }

  addCustomerServerce() {
    this.isLoading = true;
    this.customer.pkOrg = sessionStorage.getItem('pkOrg');
    this.customerService.addCustomer(this.customer).then(response => {
      if (response.success) {
        // this.message.success(this.i18NService.fanyi("newsuccess"));
        this.isLoading = false;
        this.notification.success(this.i18NService.fanyi('newsuccess'), '');
        this.nzDrawerRef.close(true);
      } else {
        this.listOfData.forEach(element => {
          element.email = this.tripledes.decrypt(element.email, 'email').toString(this.cryptoJS.enc.Utf8);
        });
        this.isLoading = false;
        this.notification.error(
          this.i18NService.fanyi('newfailure'),
          messageShared(this.i18NService, response.message),
        );
      }
    });
  }

  /////////后期整理
  sort = 1;
  /**
   * 联系人新增行
   */
  addRowContacts() {
    this.listOfData = [
      ...this.listOfData,
      {
        contactPsn: '',
        contectTel: '',
        email: '',
        address: '',
        memo: '',
        isDefault: '0',
        isDefaultBool: false,
        sort: this.sort,
      },
    ];
    this.sort++;
  }

  /**
   * 是否默认控件改变事件
   * @param data 联系人对象
   */
  isDefaultBoolChange(data: CustomerContacts) {
    if (data) {
      if (data.isDefaultBool) {
        data.isDefault = '1';
      } else {
        data.isDefault = '0';
      }
    }
  }

  close() {
    this.nzDrawerRef.close();
  }
  creditGradeChange() {}
}
