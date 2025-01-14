import { Component, OnInit, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { _HttpClient, ModalHelper, User } from '@delon/theme';
import { NzMessageService, UploadFile, NzNotificationService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { UserService } from 'app/services/user.service';
import { RoleService } from 'app/services/role.service';
import { Role } from 'app/entity/role';
import { environment } from '@env/environment';
import { Page } from 'app/entity/page';
@Component({
  selector: 'app-system-user-view',
  templateUrl: './view.component.html',
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
export class SystemUserViewComponent implements OnInit {
  constructor(
    private userService: UserService,
    private msg: NzMessageService,
    private notification: NzNotificationService,
    private roleService: RoleService,
  ) { }

  listOfOption: Array<{ label: string; value: string }> = [];
  size = 'default';
  multipleValue = [];
  user: User;
  drawerWidth = 600;
  visible = false;
  isVisible = false;
  roles: Role[];
  selectedroles: string[];
  cryptoJS = require("crypto-js");
  tripledes = require("crypto-js/tripledes");

  loading = false;
  avatarUrl: string;

  ngOnInit() {
    this.initUsers();
  }
  @Output() afterSave = new EventEmitter<{}>();
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    if (width > 600) {
      this.drawerWidth = 600;
    } else {
      this.drawerWidth = width;
    }
  }

  openView(id: string) {
    this.visible = true;
    this.userService.queryById(id).then((response) => {
      var res = response.result;
      if (res.email) {
        // res.email = this.tripledes.decrypt(res.email, 'email').toString(this.cryptoJS.enc.Utf8);
      }
      res.sex += "";
      this.user = res;
      this.avatarUrl = environment.SERVER_URL + "sys/common/view/" + this.user.avatar;
    })
    this.getInitData(id);
  }

  close() {
    this.visible = false;
    this.initUsers();
  }
  // save(){
  //   var roleString = "";
  //   this.selectedroles.forEach(element => {
  //     if(element!=null && element!=""){
  //       roleString+=element+","
  //     }
  //   });
  //   this.user.selectedroles = roleString.substring(0,roleString.length-1);
  //   this.userService.edit(this.user).then((response)=>{
  //     if(response.success){
  //       this.notification.success("修改用户成功","");
  //       this.afterSave.emit();
  //       this.close();
  //     }else{
  //       this.notification.success("修改用户失败",response.message);
  //     }
  //   })
  // }

  getInitData(id: string) {
    const page = new Page();
    page.pageSize = 500;
    this.roleService.getRoles(page).then((response) => {
      this.roles = response.result.records;
    })
    this.userService.queryUserRole(id).then((response) => {
      this.selectedroles = response.result;
    })
  }

  initUsers() {
    this.user = {
      id: "",
      username: "",
      realname: "",
      password: "",
      salt: "",
      avatar: "",
      birthday: null,
      sex: null,
      email: "",
      phone: "",
      selectedroles: "",
    }
  }

  //--------------------以下是上传头像处理方法----------------------------
  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    console.log(info);
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        this.user.avatar = info.file.response.message;
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

}
