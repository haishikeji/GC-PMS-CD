import { I18NService } from '@core';
import { Component, OnInit, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, UploadFile, NzNotificationService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { UserService } from 'app/services/user.service';
import { RoleService } from 'app/services/role.service';
import { Role } from 'app/entity/role';
import { environment } from '@env/environment';
import { User } from 'app/entity/user';
import { Page } from 'app/entity/page';
import { messageShared } from '@shared/utils/message';

@Component({
  selector: 'app-system-user-edit',
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
export class SystemUserEditComponent implements OnInit {
  constructor(
    private userService: UserService,
    private msg: NzMessageService,
    private notification: NzNotificationService,
    private roleService: RoleService,
    private i18NService: I18NService
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

  edit(id: string) {
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


  birthdayChange(event) {
    !event ? this.user.birthday = "" : this.user.birthday = this.user.birthday;
  }
  saveLoading = false;
  save() {
    this.saveLoading = true;
    var roleString = "";
    if (this.selectedroles && this.selectedroles.length >= 1) {
      this.selectedroles.forEach(element => {
        if (element != null && element != "") {
          roleString += element + ","
        }
      });
    }

    this.user.selectedroles = roleString.substring(0, roleString.length - 1);
    if (this.user.email) {
      // this.user.email = this.tripledes.encrypt(this.user.email, 'email').toString()
    }
    this.userService.edit(this.user).then((response) => {
      if (response.success) {
        this.notification.success(this.i18NService.fanyi("modify.user.success"), "");
        this.afterSave.emit();
        this.saveLoading = false;
        this.close();
      } else {
        // this.user.email = this.tripledes.decrypt(this.user.email, 'email').toString(this.cryptoJS.enc.Utf8);
        this.saveLoading = false;
        this.notification.error(this.i18NService.fanyi("modify.user.failed"), messageShared(this.i18NService,response.message));
      }
    })
  }

  getInitData(id: string) {
    var page = new Page();
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
      birthday: "",
      sex: "",
      email: "",
      phone: "",
      selectedroles: "",
    }
    this.selectedroles = [];
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
