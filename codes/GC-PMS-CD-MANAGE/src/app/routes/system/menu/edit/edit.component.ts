import { I18NService } from './../../../../core/i18n/i18n.service';
import { filter } from 'rxjs/operators';
import { MenuService } from 'app/services/menu.service';

import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'app/entity/menu';
import { NzNotificationService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { messageShared } from '@shared/utils/message';

@Component({
  selector: 'app-system-menu-edit',
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
    }
    `
  ]
})
export class SystemMenuEditComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder,private menuService:MenuService,private notification: NzNotificationService,private i18NService:I18NService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      menuType: [null, [Validators.required]],
      name: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      agree: [false]
    });
    this.initMenu();
    this.menuType = "0";
    this.nameSuccess = "";
  }
  menu:Menu;
  menuType:string;
  title:string;
  disabled:boolean = false;
  visible = false;
  selectDisabled = false;
  value: string;
  nodes = [];
  nameSuccess:string;
  expandKeys = [];
  @Output() afterSave = new EventEmitter<{}>();
  @Output() icon = new EventEmitter<{}>();
  @ViewChild('systemMenuIconComponent') systemMenuIconComponent;
  //打开抽屉
  openAdd(title:string){
    this.visible = true;
    this.title = title;
    this.disabled = false;
    this.selectDisabled = false;
  }
  changeName($event){
    console.log($event)
    this.nameSuccess = "success";
  }
  changeMenuType(){
    if(this.menuType!="0"){
      this.menuService.queryTreeList().then((response) => {
        this.nodes = response.result.treeList;
      })
    }
  }

  openAddSub(title:string,menuType:number,id:string): void {
    this.visible = true;
    this.title = title;
    this.value = id;
    this.disabled = true;
    this.selectDisabled = false;
    if(menuType==0){
      this.menuType = "1";
    }else{
      this.menuType = "2";
    }
    this.menuService.queryTreeList().then((response) => {
      this.nodes = response.result.treeList;
    })

  }

  openEdit(title:string,item:Menu){
    this.visible = true;
    this.title = title;
    this.disabled = true;
    this.selectDisabled = false;
    this.menuType = item.menuType+"";
    this.queryById(item);
  }
  queryById(item):any{
    this.menuService.queryById(item.id).then((response)=>{
      this.menu = response.result;
      if(item.menuType==0){
        return;
      }
      this.value = this.menu.parentId;
      this.menuService.queryTreeList().then((response) => {
        this.nodes = response.result.treeList;
      })
    })
  }
  close(): void {
    this.visible = false;
    this.initMenu();
  }

  onChange($event: string): void {
    this.menu.parentId = $event;
  }

  // getTreeList(){
  //   this.menuService.queryTreeList().then((response) => {
  //     this.nodes = response.result.treeList;
  //   })
  // }

  setIcon(){
    this.menu.icon = this.systemMenuIconComponent.activeIcon;
  }

  save(): void {
    this.menu.parentId = this.value;
    this.menu.menuType = +this.menuType;
    //alert(JSON.stringify(this.menu));
    //return;
    if(this.menu.id==null || this.menu.id==""){
      this.menuService.add(this.menu).then((response) => {
        //console.log(response);
        if(response.success){
          this.notification.success(this.i18NService.fanyi("insert.success"),"");
          this.afterSave.emit();
          this.close();
        }else{
          this.notification.error(this.i18NService.fanyi("insert.defeated"),messageShared(this.i18NService,response.message));
        }
      });
    }else{
      this.menuService.edit(this.menu).then((response) => {
        //console.log(response);
        if(response.success){
          this.notification.success(this.i18NService.fanyi("successful.revision"),"");
          this.afterSave.emit();
          this.close();
        }else{
          this.notification.error(this.i18NService.fanyi("modification.failed"),messageShared(this.i18NService,response.message));
        }
      });
    }

  }

  initMenu(){
    this.menu={
      name:"",
      sortNo:10,
      route:true
    }
  }

}
