import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { DepartService } from 'app/services/depart.service';

@Component({
  selector: 'app-system-depart-personnel-add-select-pk-org',
  templateUrl: './select-pk-org.component.html',
})
export class SystemDepartPersonnelAddSelectPkOrgComponent implements OnInit {
  constructor(private modal: NzModalRef, private departService: DepartService) {}

  ngOnInit(): void {
    this.getByType().then(() => {
      this.getPersonnel();
    });
  }

  personnelGet: any = {}; //传入的人员对象

  /**
   * 获取保存的数据
   */
  getPersonnel() {
    if (this.personnelGet.pkOrg) {
      //根据字符拆分
      let pkOrgList = this.personnelGet.pkOrg.split('、');
      let pkDepartList = this.personnelGet.pkDepart.split('、');
      //组成表格数据
      pkOrgList.forEach((pkOrg, index) => {
        let personnel = { pkOrgId: pkOrg, departId: pkDepartList[index] };
        this.getByOrgId(personnel);
        this.itemDataList = [...this.itemDataList, personnel];
      });
    }
  }

  //根据类型查询公司和部门1公司2部门
  listOrg = []; //公司下拉数据集合
  getByType() {
    return new Promise(resolve => {
      //查询公司
      this.departService.getByType('1').then(response => {
        this.listOrg = response.result;
        resolve();
      });
    });
  }

  //公司下拉款选中
  listDepart = []; //部门下拉数据
  companyChange(data) {
    if (data.pkOrgId) {
      //是否有值
      this.getByOrgId(data);
    } else {
      this.listDepart = [];
    }
  }

  //(根据公司id查出部门下拉框)
  getByOrgId(data) {
    this.departService.getByOrgId(data.pkOrgId).then(response => {
      data.listDepart = response.result;
    });
  }

  /**
   * 增行按钮
   */
  itemDataList = []; //明细集合
  sort = 0;
  addRow() {
    this.itemDataList = [
      ...this.itemDataList,
      {
        pkOrgId: '',
        pkOrgName: '',
        departId: '',
        departName: '',
        departList: [],
        sort: this.sort,
      },
    ];
    this.sort++;
  }

  /**
   * 删除行
   */
  deleteRow(sort) {
    this.itemDataList = this.itemDataList.filter(d => d.sort !== sort);
  }

  personnel = {
    pkOrg: '',
    pkOrgName: '',
    pkDepart: '',
    pkDepartName: '',
  };

  submitForm() {
    return new Promise(resolve => {
      let i = 0;
      this.itemDataList.forEach(element => {
        if (i == 0) {
          //公司id
          this.personnel.pkOrg = element.pkOrgId;
          //公司名称
          if (element.pkOrgId) {
            this.personnel.pkOrgName = this.getDeparName(this.listOrg, element.pkOrgId);
          }
          //部门id
          this.personnel.pkDepart = element.departId;
          //公司名称
          if (element.departId) {
            this.personnel.pkDepartName = this.getDeparName(element.listDepart, element.departId);
          }
        } else {
          //公司id
          this.personnel.pkOrg = this.personnel.pkOrg + '、' + element.pkOrgId;
          //公司名称
          if (element.pkOrgId) {
            this.personnel.pkOrgName =
              this.personnel.pkOrgName + '、' + this.getDeparName(this.listOrg, element.pkOrgId);
          }
          //部门id
          this.personnel.pkDepart = this.personnel.pkDepart + '、' + element.departId;
          //公司名称
          if (element.departId) {
            this.personnel.pkDepartName =
              this.personnel.pkDepartName + '、' + this.getDeparName(element.listDepart, element.departId);
          }
        }
        i++;
      });
      console.log(this.personnel);
      this.modal.destroy();
      resolve();
    });
  }

  getDeparName(list, id) {
    let name = '';
    list.forEach(org => {
      if (id === org.id) {
        name = org.departName;
      }
    });
    return name;
  }

  close() {
    this.modal.destroy();
  }
}
